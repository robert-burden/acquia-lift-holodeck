﻿#pragma once

#include "il2cpp-config.h"

#ifndef _MSC_VER
# include <alloca.h>
#else
# include <malloc.h>
#endif

#include <stdint.h>

#include "UnityEngine_UnityEngine_MonoBehaviour1158329972.h"

// UnityEngine.GameObject
struct GameObject_t1756533147;




#ifdef __clang__
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Winvalid-offsetof"
#pragma clang diagnostic ignored "-Wunused-variable"
#endif

// ContentManager
struct  ContentManager_t1140144612  : public MonoBehaviour_t1158329972
{
public:
	// UnityEngine.GameObject ContentManager::AugmentationObject
	GameObject_t1756533147 * ___AugmentationObject_2;

public:
	inline static int32_t get_offset_of_AugmentationObject_2() { return static_cast<int32_t>(offsetof(ContentManager_t1140144612, ___AugmentationObject_2)); }
	inline GameObject_t1756533147 * get_AugmentationObject_2() const { return ___AugmentationObject_2; }
	inline GameObject_t1756533147 ** get_address_of_AugmentationObject_2() { return &___AugmentationObject_2; }
	inline void set_AugmentationObject_2(GameObject_t1756533147 * value)
	{
		___AugmentationObject_2 = value;
		Il2CppCodeGenWriteBarrier(&___AugmentationObject_2, value);
	}
};

#ifdef __clang__
#pragma clang diagnostic pop
#endif
