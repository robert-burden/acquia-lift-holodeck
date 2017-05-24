﻿#pragma once

#include "il2cpp-config.h"

#ifndef _MSC_VER
# include <alloca.h>
#else
# include <malloc.h>
#endif

#include <stdint.h>

#include "UnityEngine_UnityEngine_MonoBehaviour1158329972.h"

// UnityEngine.Canvas
struct Canvas_t209405766;
// MenuAnimator
struct MenuAnimator_t2049002970;




#ifdef __clang__
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Winvalid-offsetof"
#pragma clang diagnostic ignored "-Wunused-variable"
#endif

// TargetBuilderUIHandler
struct  TargetBuilderUIHandler_t2867400282  : public MonoBehaviour_t1158329972
{
public:
	// UnityEngine.Canvas TargetBuilderUIHandler::mTargetBuilderCanvas
	Canvas_t209405766 * ___mTargetBuilderCanvas_2;
	// MenuAnimator TargetBuilderUIHandler::mMenuAnim
	MenuAnimator_t2049002970 * ___mMenuAnim_3;
	// System.Boolean TargetBuilderUIHandler::mVuforiaStarted
	bool ___mVuforiaStarted_4;

public:
	inline static int32_t get_offset_of_mTargetBuilderCanvas_2() { return static_cast<int32_t>(offsetof(TargetBuilderUIHandler_t2867400282, ___mTargetBuilderCanvas_2)); }
	inline Canvas_t209405766 * get_mTargetBuilderCanvas_2() const { return ___mTargetBuilderCanvas_2; }
	inline Canvas_t209405766 ** get_address_of_mTargetBuilderCanvas_2() { return &___mTargetBuilderCanvas_2; }
	inline void set_mTargetBuilderCanvas_2(Canvas_t209405766 * value)
	{
		___mTargetBuilderCanvas_2 = value;
		Il2CppCodeGenWriteBarrier(&___mTargetBuilderCanvas_2, value);
	}

	inline static int32_t get_offset_of_mMenuAnim_3() { return static_cast<int32_t>(offsetof(TargetBuilderUIHandler_t2867400282, ___mMenuAnim_3)); }
	inline MenuAnimator_t2049002970 * get_mMenuAnim_3() const { return ___mMenuAnim_3; }
	inline MenuAnimator_t2049002970 ** get_address_of_mMenuAnim_3() { return &___mMenuAnim_3; }
	inline void set_mMenuAnim_3(MenuAnimator_t2049002970 * value)
	{
		___mMenuAnim_3 = value;
		Il2CppCodeGenWriteBarrier(&___mMenuAnim_3, value);
	}

	inline static int32_t get_offset_of_mVuforiaStarted_4() { return static_cast<int32_t>(offsetof(TargetBuilderUIHandler_t2867400282, ___mVuforiaStarted_4)); }
	inline bool get_mVuforiaStarted_4() const { return ___mVuforiaStarted_4; }
	inline bool* get_address_of_mVuforiaStarted_4() { return &___mVuforiaStarted_4; }
	inline void set_mVuforiaStarted_4(bool value)
	{
		___mVuforiaStarted_4 = value;
	}
};

#ifdef __clang__
#pragma clang diagnostic pop
#endif
