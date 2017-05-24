#include "il2cpp-config.h"

#ifndef _MSC_VER
# include <alloca.h>
#else
# include <malloc.h>
#endif

#include <cstring>
#include <string.h>
#include <stdio.h>
#include <cmath>
#include <limits>
#include <assert.h>

#include "class-internals.h"
#include "codegen/il2cpp-codegen.h"
#include "mscorlib_System_Array3829468939.h"
#include "AssemblyU2DUnityScript_U3CModuleU3E3783534214.h"
#include "AssemblyU2DUnityScript_Move686167475.h"
#include "mscorlib_System_Void1841601450.h"
#include "UnityEngine_UnityEngine_Vector32243707580.h"
#include "UnityEngine_UnityEngine_MonoBehaviour1158329972.h"
#include "mscorlib_System_Single2076509932.h"
#include "mscorlib_System_String2029220233.h"
#include "UnityEngine_UnityEngine_Quaternion4030073918.h"
#include "UnityEngine_UnityEngine_Transform3275118058.h"
#include "UnityEngine_UnityEngine_Component3819376471.h"

// Move
struct Move_t686167475;
// UnityEngine.MonoBehaviour
struct MonoBehaviour_t1158329972;
// System.String
struct String_t;
// UnityEngine.Component
struct Component_t3819376471;
// UnityEngine.Transform
struct Transform_t3275118058;
extern Il2CppClass* Input_t1785128008_il2cpp_TypeInfo_var;
extern Il2CppCodeGenString* _stringLiteral855845486;
extern const uint32_t Move_Update_m1972323544_MetadataUsageId;




// System.Void UnityEngine.MonoBehaviour::.ctor()
extern "C"  void MonoBehaviour__ctor_m2464341955 (MonoBehaviour_t1158329972 * __this, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// System.Void UnityEngine.Vector3::.ctor(System.Single,System.Single,System.Single)
extern "C"  void Vector3__ctor_m2638739322 (Vector3_t2243707580 * __this, float p0, float p1, float p2, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// System.Single UnityEngine.Input::GetAxis(System.String)
extern "C"  float Input_GetAxis_m2098048324 (Il2CppObject * __this /* static, unused */, String_t* p0, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// System.Single UnityEngine.Time::get_deltaTime()
extern "C"  float Time_get_deltaTime_m2233168104 (Il2CppObject * __this /* static, unused */, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// System.Void UnityEngine.Quaternion::set_eulerAngles(UnityEngine.Vector3)
extern "C"  void Quaternion_set_eulerAngles_m3695252804 (Quaternion_t4030073918 * __this, Vector3_t2243707580  p0, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// UnityEngine.Transform UnityEngine.Component::get_transform()
extern "C"  Transform_t3275118058 * Component_get_transform_m2697483695 (Component_t3819376471 * __this, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// UnityEngine.Vector3 UnityEngine.Quaternion::op_Multiply(UnityEngine.Quaternion,UnityEngine.Vector3)
extern "C"  Vector3_t2243707580  Quaternion_op_Multiply_m1483423721 (Il2CppObject * __this /* static, unused */, Quaternion_t4030073918  p0, Vector3_t2243707580  p1, const MethodInfo* method) IL2CPP_METHOD_ATTR;
// System.Void UnityEngine.Transform::set_position(UnityEngine.Vector3)
extern "C"  void Transform_set_position_m2469242620 (Transform_t3275118058 * __this, Vector3_t2243707580  p0, const MethodInfo* method) IL2CPP_METHOD_ATTR;
#ifdef __clang__
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Winvalid-offsetof"
#pragma clang diagnostic ignored "-Wunused-variable"
#endif
// System.Void Move::.ctor()
extern "C"  void Move__ctor_m4152862755 (Move_t686167475 * __this, const MethodInfo* method)
{
	{
		MonoBehaviour__ctor_m2464341955(__this, /*hidden argument*/NULL);
		Vector3_t2243707580  L_0;
		memset(&L_0, 0, sizeof(L_0));
		Vector3__ctor_m2638739322(&L_0, (((float)((float)1))), (((float)((float)0))), (((float)((float)0))), /*hidden argument*/NULL);
		__this->set_radius_3(L_0);
		return;
	}
}
// System.Void Move::Start()
extern "C"  void Move_Start_m3486970367 (Move_t686167475 * __this, const MethodInfo* method)
{
	{
		return;
	}
}
// System.Void Move::Update()
extern "C"  void Move_Update_m1972323544 (Move_t686167475 * __this, const MethodInfo* method)
{
	static bool s_Il2CppMethodInitialized;
	if (!s_Il2CppMethodInitialized)
	{
		il2cpp_codegen_initialize_method (Move_Update_m1972323544_MetadataUsageId);
		s_Il2CppMethodInitialized = true;
	}
	{
		float L_0 = __this->get_currentRotation_4();
		IL2CPP_RUNTIME_CLASS_INIT(Input_t1785128008_il2cpp_TypeInfo_var);
		float L_1 = Input_GetAxis_m2098048324(NULL /*static, unused*/, _stringLiteral855845486, /*hidden argument*/NULL);
		float L_2 = Time_get_deltaTime_m2233168104(NULL /*static, unused*/, /*hidden argument*/NULL);
		__this->set_currentRotation_4(((float)((float)L_0+(float)((float)((float)((float)((float)L_1*(float)L_2))*(float)(((float)((float)((int32_t)100)))))))));
		float L_3 = __this->get_currentRotation_4();
		__this->set_currentRotation_4(((float)((float)L_3+(float)(((float)((float)1))))));
		Quaternion_t4030073918 * L_4 = __this->get_address_of_rotation_2();
		float L_5 = __this->get_currentRotation_4();
		Vector3_t2243707580  L_6;
		memset(&L_6, 0, sizeof(L_6));
		Vector3__ctor_m2638739322(&L_6, (((float)((float)0))), L_5, (((float)((float)0))), /*hidden argument*/NULL);
		Quaternion_set_eulerAngles_m3695252804(L_4, L_6, /*hidden argument*/NULL);
		Transform_t3275118058 * L_7 = Component_get_transform_m2697483695(__this, /*hidden argument*/NULL);
		Quaternion_t4030073918  L_8 = __this->get_rotation_2();
		Vector3_t2243707580  L_9 = __this->get_radius_3();
		Vector3_t2243707580  L_10 = Quaternion_op_Multiply_m1483423721(NULL /*static, unused*/, L_8, L_9, /*hidden argument*/NULL);
		NullCheck(L_7);
		Transform_set_position_m2469242620(L_7, L_10, /*hidden argument*/NULL);
		return;
	}
}
// System.Void Move::Main()
extern "C"  void Move_Main_m2525384124 (Move_t686167475 * __this, const MethodInfo* method)
{
	{
		return;
	}
}
#ifdef __clang__
#pragma clang diagnostic pop
#endif
