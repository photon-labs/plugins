/*
 * Phresco Maven Plugin
 *
 * Copyright (C) 1999-2013 Photon Infotech Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('model', function(Y) {

/**
Attribute-based data model with APIs for getting, setting, validating, and
syncing attribute values, as well as events for being notified of model changes.

@submodule model
@since 3.4.0
**/

/**
Attribute-based data model with APIs for getting, setting, validating, and
syncing attribute values, as well as events for being notified of model changes.

In most cases, you'll want to create your own subclass of `Y.Model` and
customize it to meet your needs. In particular, the `sync()` and `validate()`
methods are meant to be overridden by custom implementations. You may also want
to override the `parse()` method to parse non-generic server responses.

@class Model
@constructor
@extends Base
@since 3.4.0
**/

var GlobalEnv = YUI.namespace('Env.Model'),
    Lang      = Y.Lang,
    YArray    = Y.Array,
    YObject   = Y.Object,

    /**
    Fired when one or more attributes on this model are changed.

    @event change
    @param {Object} changed Hash of change information for each attribute that
        changed. Each item in the hash has the following properties:
      @param {Any} changed.newVal New value of the attribute.
      @param {Any} changed.prevVal Previous value of the attribute.
      @param {String|null} changed.src Source of the change event, if any.
    **/
    EVT_CHANGE = 'change',

    /**
    Fired when an error occurs, such as when the model doesn't validate or when
    a sync layer response can't be parsed.

    @event error
    @param {Any} error Error message, object, or exception generated by the
      error. Calling `toString()` on this should result in a meaningful error
      message.
    @param {String} src Source of the error. May be one of the following (or any
      custom error source defined by a Model subclass):

      * `parse`: An error parsing a JSON response. The response in question will
        be provided as the `response` property on the event facade.
      * `validate`: The model failed to validate. The attributes being validated
        will be provided as the `attributes` property on the event facade.
    **/
    EVT_ERROR = 'error';

function Model() {
    Model.superclass.constructor.apply(this, arguments);
}

Y.Model = Y.extend(Model, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    Hash of attributes that have changed since the last time this model was
    saved.

    @property changed
    @type Object
    @default {}
    **/

    /**
    Name of the attribute to use as the unique id (or primary key) for this
    model.

    The default is `id`, but if your persistence layer uses a different name for
    the primary key (such as `_id` or `uid`), you can specify that here.

    The built-in `id` attribute will always be an alias for whatever attribute
    name you specify here, so getting and setting `id` will always behave the
    same as getting and setting your custom id attribute.

    @property idAttribute
    @type String
    @default `'id'`
    **/
    idAttribute: 'id',

    /**
    Hash of attributes that were changed in the last `change` event. Each item
    in this hash is an object with the following properties:

      * `newVal`: The new value of the attribute after it changed.
      * `prevVal`: The old value of the attribute before it changed.
      * `src`: The source of the change, or `null` if no source was specified.

    @property lastChange
    @type Object
    @default {}
    **/

    /**
    Array of `ModelList` instances that contain this model.

    When a model is in one or more lists, the model's events will bubble up to
    those lists. You can subscribe to a model event on a list to be notified
    when any model in the list fires that event.

    This property is updated automatically when this model is added to or
    removed from a `ModelList` instance. You shouldn't alter it manually. When
    working with models in a list, you should always add and remove models using
    the list's `add()` and `remove()` methods.

    @example Subscribing to model events on a list:

        // Assuming `list` is an existing Y.ModelList instance.
        list.on('*:change', function (e) {
            // This function will be called whenever any model in the list
            // fires a `change` event.
            //
            // `e.target` will refer to the model instance that fired the
            // event.
        });

    @property lists
    @type ModelList[]
    @default `[]`
    **/

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        this.changed    = {};
        this.lastChange = {};
        this.lists      = [];
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Destroys this model instance and removes it from its containing lists, if
    any.

    If `options['delete']` is `true`, then this method also delegates to the
    `sync()` method to delete the model from the persistence layer, which is an
    asynchronous action. Provide a _callback_ function to be notified of success
    or failure.

    @method destroy
    @param {Object} [options] Sync options. It's up to the custom sync
        implementation to determine what options it supports or requires, if
        any.
      @param {Boolean} [options.delete=false] If `true`, the model will be
        deleted via the sync layer in addition to the instance being destroyed.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        `null`.
    @chainable
    **/
    destroy: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        function finish(err) {
            if (!err) {
                YArray.each(self.lists.concat(), function (list) {
                    list.remove(self, options);
                });

                Model.superclass.destroy.call(self);
            }

            callback && callback.apply(null, arguments);
        }

        if (options && options['delete']) {
            this.sync('delete', options, finish);
        } else {
            finish();
        }

        return this;
    },

    /**
    Returns a clientId string that's unique among all models on the current page
    (even models in other YUI instances). Uniqueness across pageviews is
    unlikely.

    @method generateClientId
    @return {String} Unique clientId.
    **/
    generateClientId: function () {
        GlobalEnv.lastId || (GlobalEnv.lastId = 0);
        return this.constructor.NAME + '_' + (GlobalEnv.lastId += 1);
    },

    /**
    Returns the value of the specified attribute.

    If the attribute's value is an object, _name_ may use dot notation to
    specify the path to a specific property within the object, and the value of
    that property will be returned.

    @example
        // Set the 'foo' attribute to an object.
        myModel.set('foo', {
            bar: {
                baz: 'quux'
            }
        });

        // Get the value of 'foo'.
        myModel.get('foo');
        // => {bar: {baz: 'quux'}}

        // Get the value of 'foo.bar.baz'.
        myModel.get('foo.bar.baz');
        // => 'quux'

    @method get
    @param {String} name Attribute name or object property path.
    @return {Any} Attribute value, or `undefined` if the attribute doesn't
      exist.
    **/

    // get() is defined by Y.Attribute.

    /**
    Returns an HTML-escaped version of the value of the specified string
    attribute. The value is escaped using `Y.Escape.html()`.

    @method getAsHTML
    @param {String} name Attribute name or object property path.
    @return {String} HTML-escaped attribute value.
    **/
    getAsHTML: function (name) {
        var value = this.get(name);
        return Y.Escape.html(Lang.isValue(value) ? String(value) : '');
    },

    /**
    Returns a URL-encoded version of the value of the specified string
    attribute. The value is encoded using the native `encodeURIComponent()`
    function.

    @method getAsURL
    @param {String} name Attribute name or object property path.
    @return {String} URL-encoded attribute value.
    **/
    getAsURL: function (name) {
        var value = this.get(name);
        return encodeURIComponent(Lang.isValue(value) ? String(value) : '');
    },

    /**
    Returns `true` if any attribute of this model has been changed since the
    model was last saved.

    New models (models for which `isNew()` returns `true`) are implicitly
    considered to be "modified" until the first time they're saved.

    @method isModified
    @return {Boolean} `true` if this model has changed since it was last saved,
      `false` otherwise.
    **/
    isModified: function () {
        return this.isNew() || !YObject.isEmpty(this.changed);
    },

    /**
    Returns `true` if this model is "new", meaning it hasn't been saved since it
    was created.

    Newness is determined by checking whether the model's `id` attribute has
    been set. An empty id is assumed to indicate a new model, whereas a
    non-empty id indicates a model that was either loaded or has been saved
    since it was created.

    @method isNew
    @return {Boolean} `true` if this model is new, `false` otherwise.
    **/
    isNew: function () {
        return !Lang.isValue(this.get('id'));
    },

    /**
    Loads this model from the server.

    This method delegates to the `sync()` method to perform the actual load
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the load operation succeeds and one or more of the loaded attributes
    differ from this model's current attributes, a `change` event will be fired.

    @method load
    @param {Object} [options] Options to be passed to `sync()` and to `set()`
      when setting the loaded attributes. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        `null`.
      @param {Any} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    @chainable
    **/
    load: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        this.sync('read', options, function (err, response) {
            if (!err) {
                self.setAttrs(self.parse(response), options);
                self.changed = {};
            }

            callback && callback.apply(null, arguments);
        });

        return this;
    },

    /**
    Called to parse the _response_ when the model is loaded from the server.
    This method receives a server _response_ and is expected to return an
    attribute hash.

    The default implementation assumes that _response_ is either an attribute
    hash or a JSON string that can be parsed into an attribute hash. If
    _response_ is a JSON string and either `Y.JSON` or the native `JSON` object
    are available, it will be parsed automatically. If a parse error occurs, an
    `error` event will be fired and the model will not be updated.

    You may override this method to implement custom parsing logic if necessary.

    @method parse
    @param {Any} response Server response.
    @return {Object} Attribute hash.
    **/
    parse: function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });

                return null;
            }
        }

        return response;
    },

    /**
    Saves this model to the server.

    This method delegates to the `sync()` method to perform the actual save
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the save operation succeeds and one or more of the attributes returned in
    the server's response differ from this model's current attributes, a
    `change` event will be fired.

    @method save
    @param {Object} [options] Options to be passed to `sync()` and to `set()`
      when setting synced attributes. It's up to the custom sync implementation
      to determine what options it supports or requires, if any.
    @param {Function} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred or validation
        failed, this parameter will contain the error. If the sync operation
        succeeded, _err_ will be `null`.
      @param {Any} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    @chainable
    **/
    save: function (options, callback) {
        var self       = this,
            validation = self._validate(self.toJSON());

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        if (!validation.valid) {
            callback && callback.call(null, validation.error);
            return self;
        }

        self.sync(self.isNew() ? 'create' : 'update', options, function (err, response) {
            if (!err) {
                if (response) {
                    self.setAttrs(self.parse(response), options);
                }

                self.changed = {};
            }

            callback && callback.apply(null, arguments);
        });

        return self;
    },

    /**
    Sets the value of a single attribute. If model validation fails, the
    attribute will not be set and an `error` event will be fired.

    Use `setAttrs()` to set multiple attributes at once.

    @example
        model.set('foo', 'bar');

    @method set
    @param {String} name Attribute name or object property path.
    @param {any} value Value to set.
    @param {Object} [options] Data to be mixed into the event facade of the
        `change` event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    set: function (name, value, options) {
        var attributes = {};
        attributes[name] = value;

        return this.setAttrs(attributes, options);
    },

    /**
    Sets the values of multiple attributes at once. If model validation fails,
    the attributes will not be set and an `error` event will be fired.

    @example
        model.setAttrs({
            foo: 'bar',
            baz: 'quux'
        });

    @method setAttrs
    @param {Object} attributes Hash of attribute names and values to set.
    @param {Object} [options] Data to be mixed into the event facade of the
        `change` event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    setAttrs: function (attributes, options) {
        var idAttribute = this.idAttribute,
            changed, e, key, lastChange, transaction;

        options || (options = {});
        transaction = options._transaction = {};

        // When a custom id attribute is in use, always keep the default `id`
        // attribute in sync.
        if (idAttribute !== 'id') {
            // So we don't modify someone else's object.
            attributes = Y.merge(attributes);

            if (YObject.owns(attributes, idAttribute)) {
                attributes.id = attributes[idAttribute];
            } else if (YObject.owns(attributes, 'id')) {
                attributes[idAttribute] = attributes.id;
            }
        }

        for (key in attributes) {
            if (YObject.owns(attributes, key)) {
                this._setAttr(key, attributes[key], options);
            }
        }

        if (!YObject.isEmpty(transaction)) {
            changed    = this.changed;
            lastChange = this.lastChange = {};

            for (key in transaction) {
                if (YObject.owns(transaction, key)) {
                    e = transaction[key];

                    changed[key] = e.newVal;

                    lastChange[key] = {
                        newVal : e.newVal,
                        prevVal: e.prevVal,
                        src    : e.src || null
                    };
                }
            }

            if (!options.silent) {
                // Lazy publish for the change event.
                if (!this._changeEvent) {
                    this._changeEvent = this.publish(EVT_CHANGE, {
                        preventable: false
                    });
                }

                this.fire(EVT_CHANGE, {changed: lastChange});
            }
        }

        return this;
    },

    /**
    Override this method to provide a custom persistence implementation for this
    model. The default just calls the callback without actually doing anything.

    This method is called internally by `load()`, `save()`, and `destroy()`.

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * `create`: Store a newly-created model for the first time.
      * `delete`: Delete an existing model.
      * `read`  : Load an existing model.
      * `update`: Update an existing model.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {Any} [callback.response] The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    **/
    sync: function (/* action, options, callback */) {
        var callback = YArray(arguments, 0, true).pop();

        if (typeof callback === 'function') {
            callback();
        }
    },

    /**
    Returns a copy of this model's attributes that can be passed to
    `Y.JSON.stringify()` or used for other nefarious purposes.

    The `clientId` attribute is not included in the returned object.

    If you've specified a custom attribute name in the `idAttribute` property,
    the default `id` attribute will not be included in the returned object.

    @method toJSON
    @return {Object} Copy of this model's attributes.
    **/
    toJSON: function () {
        var attrs = this.getAttrs();

        delete attrs.clientId;
        delete attrs.destroyed;
        delete attrs.initialized;

        if (this.idAttribute !== 'id') {
            delete attrs.id;
        }

        return attrs;
    },

    /**
    Reverts the last change to the model.

    If an _attrNames_ array is provided, then only the named attributes will be
    reverted (and only if they were modified in the previous change). If no
    _attrNames_ array is provided, then all changed attributes will be reverted
    to their previous values.

    Note that only one level of undo is available: from the current state to the
    previous state. If `undo()` is called when no previous state is available,
    it will simply do nothing.

    @method undo
    @param {Array} [attrNames] Array of specific attribute names to revert. If
      not specified, all attributes modified in the last change will be
      reverted.
    @param {Object} [options] Data to be mixed into the event facade of the
        change event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    undo: function (attrNames, options) {
        var lastChange  = this.lastChange,
            idAttribute = this.idAttribute,
            toUndo      = {},
            needUndo;

        attrNames || (attrNames = YObject.keys(lastChange));

        YArray.each(attrNames, function (name) {
            if (YObject.owns(lastChange, name)) {
                // Don't generate a double change for custom id attributes.
                name = name === idAttribute ? 'id' : name;

                needUndo     = true;
                toUndo[name] = lastChange[name].prevVal;
            }
        });

        return needUndo ? this.setAttrs(toUndo, options) : this;
    },

    /**
    Override this method to provide custom validation logic for this model.
    While attribute-specific validators can be used to validate individual
    attributes, this method gives you a hook to validate a hash of all
    attributes before the model is saved. This method is called automatically
    before `save()` takes any action. If validation fails, the `save()` call
    will be aborted.

    A call to `validate` that doesn't return anything (or that returns `null`)
    will be treated as a success. If the `validate` method returns a value, it
    will be treated as a failure, and the returned value (which may be a string
    or an object containing information about the failure) will be passed along
    to the `error` event.

    @method validate
    @param {Object} attributes Attribute hash containing all model attributes to
      be validated.
    @return {Any} Any return value other than `undefined` or `null` will be
      treated as a validation failure.
    **/
    validate: function (/* attributes */) {},

    // -- Protected Methods ----------------------------------------------------

    /**
    Duckpunches the `addAttr` method provided by `Y.Attribute` to keep the
    `id` attribute’s value and a custom id attribute’s (if provided) value
    in sync when adding the attributes to the model instance object.

    Marked as protected to hide it from Model's public API docs, even though
    this is a public method in Attribute.

    @method addAttr
    @param {String} name The name of the attribute.
    @param {Object} config An object with attribute configuration property/value
      pairs, specifying the configuration for the attribute.
    @param {boolean} lazy (optional) Whether or not to add this attribute lazily
      (on the first call to get/set).
    @return {Object} A reference to the host object.
    @chainable
    @protected
    **/
    addAttr: function (name, config, lazy) {
        var idAttribute = this.idAttribute,
            idAttrCfg, id;

        if (idAttribute && name === idAttribute) {
            idAttrCfg = this._isLazyAttr('id') || this._getAttrCfg('id');
            id        = config.value === config.defaultValue ? null : config.value;

            if (!Lang.isValue(id)) {
                // Hunt for the id value.
                id = idAttrCfg.value === idAttrCfg.defaultValue ? null : idAttrCfg.value;

                if (!Lang.isValue(id)) {
                    // No id value provided on construction, check defaults.
                    id = Lang.isValue(config.defaultValue) ?
                        config.defaultValue :
                        idAttrCfg.defaultValue;
                }
            }

            config.value = id;

            // Make sure `id` is in sync.
            if (idAttrCfg.value !== id) {
                idAttrCfg.value = id;

                if (this._isLazyAttr('id')) {
                    this._state.add('id', 'lazy', idAttrCfg);
                } else {
                    this._state.add('id', 'value', id);
                }
            }
        }

        return Model.superclass.addAttr.apply(this, arguments);
    },

    /**
    Calls the public, overridable `validate()` method and fires an `error` event
    if validation fails.

    @method _validate
    @param {Object} attributes Attribute hash.
    @return {Object} Validation results.
    @protected
    **/
    _validate: function (attributes) {
        var error = this.validate(attributes);

        if (Lang.isValue(error)) {
            // Validation failed. Fire an error.
            this.fire(EVT_ERROR, {
                attributes: attributes,
                error     : error,
                src       : 'validate'
            });

            return {valid: false, error: error};
        }

        return {valid: true};
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Duckpunches the `_defAttrChangeFn()` provided by `Y.Attribute` so we can
    have a single global notification when a change event occurs.

    @method _defAttrChangeFn
    @param {EventFacade} e
    @protected
    **/
    _defAttrChangeFn: function (e) {
        var attrName = e.attrName;

        if (!this._setAttrVal(attrName, e.subAttrName, e.prevVal, e.newVal)) {
            Y.log('State not updated and stopImmediatePropagation called for attribute: ' + attrName + ' , value:' + e.newVal, 'warn', 'attribute');
            // Prevent "after" listeners from being invoked since nothing changed.
            e.stopImmediatePropagation();
        } else {
            e.newVal = this.get(attrName);

            if (e._transaction) {
                e._transaction[attrName] = e;
            }
        }
    }
}, {
    NAME: 'model',

    ATTRS: {
        /**
        A client-only identifier for this model.

        Like the `id` attribute, `clientId` may be used to retrieve model
        instances from lists. Unlike the `id` attribute, `clientId` is
        automatically generated, and is only intended to be used on the client
        during the current pageview.

        @attribute clientId
        @type String
        @readOnly
        **/
        clientId: {
            valueFn : 'generateClientId',
            readOnly: true
        },

        /**
        A unique identifier for this model. Among other things, this id may be
        used to retrieve model instances from lists, so it should be unique.

        If the id is empty, this model instance is assumed to represent a new
        item that hasn't yet been saved.

        If you would prefer to use a custom attribute as this model's id instead
        of using the `id` attribute (for example, maybe you'd rather use `_id`
        or `uid` as the primary id), you may set the `idAttribute` property to
        the name of your custom id attribute. The `id` attribute will then
        act as an alias for your custom attribute.

        @attribute id
        @type String|Number|null
        @default `null`
        **/
        id: {value: null}
    }
});


}, '3.4.1' ,{requires:['base-build', 'escape', 'json-parse']});
