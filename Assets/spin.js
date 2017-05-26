#pragma strict

public var speed : float = 10f;

function Start () {
	
}

function Update ()
{
    transform.Rotate(Vector3.up, speed * Time.deltaTime);
}
