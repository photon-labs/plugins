//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2012.09.14 at 07:28:29 PM IST 
//


package com.photon.phresco.plugins.model;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="mojo">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="goal" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="implementation" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="language" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="configuration">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="parameters">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="parameter">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;sequence>
 *                                                 &lt;element name="key" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                                 &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                                 &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                                 &lt;element name="required" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                                 &lt;element name="editable" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                                 &lt;element name="possibleValues">
 *                                                   &lt;complexType>
 *                                                     &lt;complexContent>
 *                                                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                                         &lt;sequence>
 *                                                           &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                                                         &lt;/sequence>
 *                                                       &lt;/restriction>
 *                                                     &lt;/complexContent>
 *                                                   &lt;/complexType>
 *                                                 &lt;/element>
 *                                                 &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                               &lt;/sequence>
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "mojo"
})
@XmlRootElement(name = "mojos")
public class Mojos {

    @XmlElement(required = true)
    protected Mojos.Mojo mojo;

    /**
     * Gets the value of the mojo property.
     * 
     * @return
     *     possible object is
     *     {@link Mojos.Mojo }
     *     
     */
    public Mojos.Mojo getMojo() {
        return mojo;
    }

    /**
     * Sets the value of the mojo property.
     * 
     * @param value
     *     allowed object is
     *     {@link Mojos.Mojo }
     *     
     */
    public void setMojo(Mojos.Mojo value) {
        this.mojo = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="goal" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="implementation" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="language" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="configuration">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="parameters">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="parameter">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;sequence>
     *                                       &lt;element name="key" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                       &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                       &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                       &lt;element name="required" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                       &lt;element name="editable" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                       &lt;element name="possibleValues">
     *                                         &lt;complexType>
     *                                           &lt;complexContent>
     *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                               &lt;sequence>
     *                                                 &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *                                               &lt;/sequence>
     *                                             &lt;/restriction>
     *                                           &lt;/complexContent>
     *                                         &lt;/complexType>
     *                                       &lt;/element>
     *                                       &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                     &lt;/sequence>
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "goal",
        "implementation",
        "language",
        "configuration"
    })
    public static class Mojo {

        @XmlElement(required = true)
        protected String goal;
        @XmlElement(required = true)
        protected String implementation;
        @XmlElement(required = true)
        protected String language;
        @XmlElement(required = true)
        protected Mojos.Mojo.Configuration configuration;

        /**
         * Gets the value of the goal property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getGoal() {
            return goal;
        }

        /**
         * Sets the value of the goal property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setGoal(String value) {
            this.goal = value;
        }

        /**
         * Gets the value of the implementation property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getImplementation() {
            return implementation;
        }

        /**
         * Sets the value of the implementation property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setImplementation(String value) {
            this.implementation = value;
        }

        /**
         * Gets the value of the language property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getLanguage() {
            return language;
        }

        /**
         * Sets the value of the language property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setLanguage(String value) {
            this.language = value;
        }

        /**
         * Gets the value of the configuration property.
         * 
         * @return
         *     possible object is
         *     {@link Mojos.Mojo.Configuration }
         *     
         */
        public Mojos.Mojo.Configuration getConfiguration() {
            return configuration;
        }

        /**
         * Sets the value of the configuration property.
         * 
         * @param value
         *     allowed object is
         *     {@link Mojos.Mojo.Configuration }
         *     
         */
        public void setConfiguration(Mojos.Mojo.Configuration value) {
            this.configuration = value;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="parameters">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="parameter">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;sequence>
         *                             &lt;element name="key" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                             &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                             &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                             &lt;element name="required" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                             &lt;element name="editable" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                             &lt;element name="possibleValues">
         *                               &lt;complexType>
         *                                 &lt;complexContent>
         *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                                     &lt;sequence>
         *                                       &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
         *                                     &lt;/sequence>
         *                                   &lt;/restriction>
         *                                 &lt;/complexContent>
         *                               &lt;/complexType>
         *                             &lt;/element>
         *                             &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                           &lt;/sequence>
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                 &lt;/sequence>
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "parameters"
        })
        public static class Configuration {

            @XmlElement(required = true)
            protected Mojos.Mojo.Configuration.Parameters parameters;

            /**
             * Gets the value of the parameters property.
             * 
             * @return
             *     possible object is
             *     {@link Mojos.Mojo.Configuration.Parameters }
             *     
             */
            public Mojos.Mojo.Configuration.Parameters getParameters() {
                return parameters;
            }

            /**
             * Sets the value of the parameters property.
             * 
             * @param value
             *     allowed object is
             *     {@link Mojos.Mojo.Configuration.Parameters }
             *     
             */
            public void setParameters(Mojos.Mojo.Configuration.Parameters value) {
                this.parameters = value;
            }


            /**
             * <p>Java class for anonymous complex type.
             * 
             * <p>The following schema fragment specifies the expected content contained within this class.
             * 
             * <pre>
             * &lt;complexType>
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;sequence>
             *         &lt;element name="parameter">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;sequence>
             *                   &lt;element name="key" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                   &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                   &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                   &lt;element name="required" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                   &lt;element name="editable" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                   &lt;element name="possibleValues">
             *                     &lt;complexType>
             *                       &lt;complexContent>
             *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                           &lt;sequence>
             *                             &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
             *                           &lt;/sequence>
             *                         &lt;/restriction>
             *                       &lt;/complexContent>
             *                     &lt;/complexType>
             *                   &lt;/element>
             *                   &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                 &lt;/sequence>
             *               &lt;/restriction>
             *             &lt;/complexContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *       &lt;/sequence>
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                "parameter"
            })
            public static class Parameters {

                @XmlElement(required = true)
                protected Mojos.Mojo.Configuration.Parameters.Parameter parameter;

                /**
                 * Gets the value of the parameter property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link Mojos.Mojo.Configuration.Parameters.Parameter }
                 *     
                 */
                public Mojos.Mojo.Configuration.Parameters.Parameter getParameter() {
                    return parameter;
                }

                /**
                 * Sets the value of the parameter property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link Mojos.Mojo.Configuration.Parameters.Parameter }
                 *     
                 */
                public void setParameter(Mojos.Mojo.Configuration.Parameters.Parameter value) {
                    this.parameter = value;
                }


                /**
                 * <p>Java class for anonymous complex type.
                 * 
                 * <p>The following schema fragment specifies the expected content contained within this class.
                 * 
                 * <pre>
                 * &lt;complexType>
                 *   &lt;complexContent>
                 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *       &lt;sequence>
                 *         &lt;element name="key" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *         &lt;element name="required" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *         &lt;element name="editable" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *         &lt;element name="possibleValues">
                 *           &lt;complexType>
                 *             &lt;complexContent>
                 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *                 &lt;sequence>
                 *                   &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
                 *                 &lt;/sequence>
                 *               &lt;/restriction>
                 *             &lt;/complexContent>
                 *           &lt;/complexType>
                 *         &lt;/element>
                 *         &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *       &lt;/sequence>
                 *     &lt;/restriction>
                 *   &lt;/complexContent>
                 * &lt;/complexType>
                 * </pre>
                 * 
                 * 
                 */
                @XmlAccessorType(XmlAccessType.FIELD)
                @XmlType(name = "", propOrder = {
                    "key",
                    "name",
                    "type",
                    "required",
                    "editable",
                    "possibleValues",
                    "value"
                })
                public static class Parameter {

                    @XmlElement(required = true)
                    protected String key;
                    @XmlElement(required = true)
                    protected String name;
                    @XmlElement(required = true)
                    protected String type;
                    @XmlElement(required = true)
                    protected String required;
                    @XmlElement(required = true)
                    protected String editable;
                    @XmlElement(required = true)
                    protected Mojos.Mojo.Configuration.Parameters.Parameter.PossibleValues possibleValues;
                    @XmlElement(required = true)
                    protected String value;

                    /**
                     * Gets the value of the key property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getKey() {
                        return key;
                    }

                    /**
                     * Sets the value of the key property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setKey(String value) {
                        this.key = value;
                    }

                    /**
                     * Gets the value of the name property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getName() {
                        return name;
                    }

                    /**
                     * Sets the value of the name property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setName(String value) {
                        this.name = value;
                    }

                    /**
                     * Gets the value of the type property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getType() {
                        return type;
                    }

                    /**
                     * Sets the value of the type property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setType(String value) {
                        this.type = value;
                    }

                    /**
                     * Gets the value of the required property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getRequired() {
                        return required;
                    }

                    /**
                     * Sets the value of the required property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setRequired(String value) {
                        this.required = value;
                    }

                    /**
                     * Gets the value of the editable property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getEditable() {
                        return editable;
                    }

                    /**
                     * Sets the value of the editable property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setEditable(String value) {
                        this.editable = value;
                    }

                    /**
                     * Gets the value of the possibleValues property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link Mojos.Mojo.Configuration.Parameters.Parameter.PossibleValues }
                     *     
                     */
                    public Mojos.Mojo.Configuration.Parameters.Parameter.PossibleValues getPossibleValues() {
                        return possibleValues;
                    }

                    /**
                     * Sets the value of the possibleValues property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link Mojos.Mojo.Configuration.Parameters.Parameter.PossibleValues }
                     *     
                     */
                    public void setPossibleValues(Mojos.Mojo.Configuration.Parameters.Parameter.PossibleValues value) {
                        this.possibleValues = value;
                    }

                    /**
                     * Gets the value of the value property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getValue() {
                        return value;
                    }

                    /**
                     * Sets the value of the value property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setValue(String value) {
                        this.value = value;
                    }


                    /**
                     * <p>Java class for anonymous complex type.
                     * 
                     * <p>The following schema fragment specifies the expected content contained within this class.
                     * 
                     * <pre>
                     * &lt;complexType>
                     *   &lt;complexContent>
                     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                     *       &lt;sequence>
                     *         &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
                     *       &lt;/sequence>
                     *     &lt;/restriction>
                     *   &lt;/complexContent>
                     * &lt;/complexType>
                     * </pre>
                     * 
                     * 
                     */
                    @XmlAccessorType(XmlAccessType.FIELD)
                    @XmlType(name = "", propOrder = {
                        "value"
                    })
                    public static class PossibleValues {

                        protected List<String> value;

                        /**
                         * Gets the value of the value property.
                         * 
                         * <p>
                         * This accessor method returns a reference to the live list,
                         * not a snapshot. Therefore any modification you make to the
                         * returned list will be present inside the JAXB object.
                         * This is why there is not a <CODE>set</CODE> method for the value property.
                         * 
                         * <p>
                         * For example, to add a new item, do as follows:
                         * <pre>
                         *    getValue().add(newItem);
                         * </pre>
                         * 
                         * 
                         * <p>
                         * Objects of the following type(s) are allowed in the list
                         * {@link String }
                         * 
                         * 
                         */
                        public List<String> getValue() {
                            if (value == null) {
                                value = new ArrayList<String>();
                            }
                            return this.value;
                        }

                    }

                }

            }

        }

    }

}
