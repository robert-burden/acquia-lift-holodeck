#pragma once

#include "il2cpp-config.h"

#ifndef _MSC_VER
# include <alloca.h>
#else
# include <malloc.h>
#endif

#include <stdint.h>

#include "UnityEngine_UnityEngine_MonoBehaviour1158329972.h"
#include "UnityEngine_UnityEngine_Quaternion4030073918.h"
#include "UnityEngine_UnityEngine_Vector32243707580.h"





#ifdef __clang__
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Winvalid-offsetof"
#pragma clang diagnostic ignored "-Wunused-variable"
#endif

// Move
struct  Move_t686167475  : public MonoBehaviour_t1158329972
{
public:
	// UnityEngine.Quaternion Move::rotation
	Quaternion_t4030073918  ___rotation_2;
	// UnityEngine.Vector3 Move::radius
	Vector3_t2243707580  ___radius_3;
	// System.Single Move::currentRotation
	float ___currentRotation_4;

public:
	inline static int32_t get_offset_of_rotation_2() { return static_cast<int32_t>(offsetof(Move_t686167475, ___rotation_2)); }
	inline Quaternion_t4030073918  get_rotation_2() const { return ___rotation_2; }
	inline Quaternion_t4030073918 * get_address_of_rotation_2() { return &___rotation_2; }
	inline void set_rotation_2(Quaternion_t4030073918  value)
	{
		___rotation_2 = value;
	}

	inline static int32_t get_offset_of_radius_3() { return static_cast<int32_t>(offsetof(Move_t686167475, ___radius_3)); }
	inline Vector3_t2243707580  get_radius_3() const { return ___radius_3; }
	inline Vector3_t2243707580 * get_address_of_radius_3() { return &___radius_3; }
	inline void set_radius_3(Vector3_t2243707580  value)
	{
		___radius_3 = value;
	}

	inline static int32_t get_offset_of_currentRotation_4() { return static_cast<int32_t>(offsetof(Move_t686167475, ___currentRotation_4)); }
	inline float get_currentRotation_4() const { return ___currentRotation_4; }
	inline float* get_address_of_currentRotation_4() { return &___currentRotation_4; }
	inline void set_currentRotation_4(float value)
	{
		___currentRotation_4 = value;
	}
};

#ifdef __clang__
#pragma clang diagnostic pop
#endif
