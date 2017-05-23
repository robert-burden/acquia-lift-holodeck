#pragma strict

function Start () {
	
}

 var rotation : Quaternion;
 var radius = Vector3(1,0,0);
 var currentRotation = 0.0;
 function Update()
 {
     currentRotation += Input.GetAxis("Horizontal")*Time.deltaTime*100;
     currentRotation ++;
     rotation.eulerAngles = Vector3(0, currentRotation, 0);
     transform.position = rotation * radius;
 }