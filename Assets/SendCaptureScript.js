#pragma strict

var trackableBehaviour:Vuforia.TrackableBehaviour;
var captureSendTracker:CaptureSendTracker;

function Start () {
   Debug.Log("Start Default Capture Script");	
   trackableBehaviour = GetComponent.<Vuforia.TrackableBehaviour>();
   captureSendTracker = new CaptureSendTracker();
   captureSendTracker.trackableName =  trackableBehaviour.TrackableName;
   trackableBehaviour.RegisterTrackableEventHandler( captureSendTracker );
}

function OnTrackableStateChanged(previousState,newState) {
   Debug.Log("Tracking State Changed Capture Script");
}

function Update () {
}

class CaptureSendTracker extends Object implements Vuforia.ITrackableEventHandler {
   var trackableName;


   function OnTrackableStateChanged(previousStatus:Vuforia.TrackableBehaviour.Status,newStatus:Vuforia.TrackableBehaviour.Status) {
      if ( newStatus == Vuforia.TrackableBehaviour.Status.DETECTED ||
           newStatus == Vuforia.TrackableBehaviour.Status.TRACKED ||
           newStatus == Vuforia.TrackableBehaviour.Status.EXTENDED_TRACKED)
      {
               Debug.Log("Found = "+trackableName);
               /*
               UnityWebRequest www = UnityWebRequest.Get("http://www.google.com");
        yield return www.Send();
 
        if(www.isError) {
            Debug.Log("Google Response : "+www.responseText);
        }
        else {
            Debug.Log("Form upload complete!");
        }
            var xmlHttpRequest = new UnityWebRequest();
xmlhttp.open('GET', 'http://www.google.com', false);
xmlhttp.send();
            */

      }
      else
      {
         Debug.Log("Lost = "+trackableName);
      }
   }
}
