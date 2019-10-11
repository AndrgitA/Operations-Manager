package utils

import (
	"fmt"
	"strconv"
)

type TypeEnum uint

const (
	Invalid TypeEnum = iota
	Bool
	Int
	// Int8
	// Int16
	// Int32
	// Int64
	Uint
	// Uint8
	// Uint16
	// Uint32
	// Uint64

	Float
	// Float32
	// Float64
	String
)

type Value struct {
	Value interface{}
	Type  TypeEnum
	Null  bool
}

func (v *Value) String() string {
	return fmt.Sprintf("%s", v.Value)
}

func ConvertString(_type TypeEnum, value string) Value {
	var result interface{}
	var err error
	var returnValue Value

	switch _type {
	case Bool:
		result, err = strconv.ParseBool(value)
		returnValue = Value{Value: result, Type: _type, Null: err != nil}
	case Int:
		result, err = strconv.ParseInt(value, 10, 64)
		returnValue = Value{Value: int(result.(int64)), Type: _type, Null: err != nil}
	case Uint:
		result, err = strconv.ParseUint(value, 10, 64)
		returnValue = Value{Value: uint(result.(uint64)), Type: _type, Null: err != nil}
	case Float:
		result, err = strconv.ParseFloat(value, 64)
		returnValue = Value{Value: float32(result.(float64)), Type: _type, Null: err != nil}
	case String:
		returnValue = Value{Value: value, Type: _type, Null: false}
	default:
		return Value{Type: _type, Null: true}
	}

	return returnValue
}
