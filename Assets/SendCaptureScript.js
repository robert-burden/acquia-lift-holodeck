#pragma strict

static var touchIdentifier;
static var trackingIdentifier;

var trackableBehaviour: Vuforia.TrackableBehaviour;
var captureSendTracker: CaptureSendTracker;
var identityName = "Neil O'Donnell";

var actionToCaptures: Boo.Lang.Hash;
var actionToPath: Boo.Lang.Hash;
var tagToAction: Boo.Lang.Hash;
var tagToDecisionAction: Boo.Lang.Hash;

function Start() {
    Debug.Log("Start Default Capture Script");
    trackableBehaviour = GetComponent. < Vuforia.TrackableBehaviour > ();
    captureSendTracker = new CaptureSendTracker(this);
    captureSendTracker.trackableName = trackableBehaviour.TrackableName;
    trackableBehaviour.RegisterTrackableEventHandler(captureSendTracker);
    this.InitMaps();
}

function InitMaps() {
    if (touchIdentifier == null) {
        touchIdentifier = System.Guid.NewGuid().ToString().Replace('-', '').Substring(0, 16);
    }
    if (trackingIdentifier == null) {
        trackingIdentifier = System.Guid.NewGuid().ToString().Replace('-', '').Substring(0, 16);
    }
    var indoorsUpdatePersonCapture = this.GetCapture({
        'event_name': 'updatePerson',
        'event_source': 'Holodeck',
        'person_udf4': '30',
        'person_udf5': 'Male',
        'person_udf6': 'Cambridgeside Galleria Indoors'
    });
    var parkingLotUpdatePersonCapture = this.GetCapture({
        'event_name': 'updatePerson',
        'event_source': 'Holodeck',
        'person_udf4': '30',
        'person_udf5': 'Male',
        'person_udf6': 'Cambridgeside Galleria Parking Lot'
    });
    var posterTagRecognitionCapture = this.GetCapture({
        'event_name': 'Tag Recognition',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Indoors',
        'event_udf6': 'POSTER'
    });
    var posterAugmentedRealityActivatedCapture = this.GetCapture({
        'event_name': 'Augmented Reality Activated',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Indoors',
        'event_udf6': 'POSTER'
    });
    var unicornFrappuccinoBuyCapture = this.GetCapture({
        'event_name': 'Buy',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Indoors',
        'event_udf6': 'POSTER',
        'event_udf7': 'Unicorn Frappuccino'
    });
    var shirtTagRecognitionCapture = this.GetCapture({
        'event_name': 'Tag Recognition',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Indoors',
        'event_udf6': 'TSHIRT'
    });
    var shirtAugmentedRealityActivatedCapture = this.GetCapture({
        'event_name': 'Augmented Reality Activated',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Indoors',
        'event_udf6': 'TSHIRT'
    });
    var shirtCartAbandonCapture = this.GetCapture({
        'event_name': 'Cart Abandon',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Parking Lot',
        'event_udf6': 'TSHIRT',
        'event_udf7': 'Drupal T Shirt'
    });
    var shirtBuyCapture = this.GetCapture({
        'event_name': 'Buy',
        'event_source': 'Holodeck',
        'event_udf3': '42.3601',
        'event_udf4': '71.0589',
        'event_udf5': 'Cambridgeside Galleria Parking Lot',
        'event_udf6': 'TSHIRT',
        'event_udf7': 'Drupal T Shirt'
    });

    actionToPath = {
        "readStarbucksPoster": "starbucks",
        "activatedStarbucksAr": "starbucks",
        "buyStarbucksCoffee": "starbucks",
        "readShirtAction": "meeting",
        "activatedShirtAr": "meeting",
        "abandonBuyShirt": "meeting",
        "parkingLotUpdatePerson": "car",
        "buyShirt": "car"
    };

    actionToCaptures = {
        "readStarbucksPoster": [indoorsUpdatePersonCapture, posterTagRecognitionCapture],
        "activatedStarbucksAr": [posterAugmentedRealityActivatedCapture],
        "buyStarbucksCoffee": [unicornFrappuccinoBuyCapture],
        "readShirtAction": [shirtTagRecognitionCapture],
        "activatedShirtAr": [shirtAugmentedRealityActivatedCapture],
        "abandonBuyShirt": [shirtCartAbandonCapture],
        "parkingLotUpdatePerson": [parkingLotUpdatePersonCapture],
        "buyShirt": [shirtBuyCapture]
    };
    tagToAction = {
        "LIFT": "readStarbucksPoster",
        "icon": "readShirtAction"
    };
    tagToDecisionAction = {
        "LIFT": "activatedStarbucksAr",
        "icon": "activatedShirtAr"
    };
}

function Update() {

}

function SendCaptureApiByAction(action) {
    var scenario = actionToPath[action];
    var captures: Boo.Lang.Hash[] = actionToCaptures[action];


    // Get a decision (while posting captures).
    var payloadConfig = {
        // 'identity':'73ESltNk6AEHBVi1nWiApx', // Override by your own if needed.
        'captures': captures
    };
    var payload = this.GetPayload(scenario, payloadConfig);
    // Configure local caller script.
    var method = 'POST';
    var path = 'https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide?account_id=HOLODECK&site_id=holodeck&version=1.10.4';
    // path = "http://httpbin.org/post";
    var body = this.GetJSONOfMap(payload);
    Debug.Log("Normal Capture " + body);

    // Create and configure the request.
    var request = new Networking.UnityWebRequest(path, Networking.UnityWebRequest.kHttpVerbPOST);
    // Temp body
    var bodyBytes = System.Text.Encoding.UTF8.GetBytes(body);
    var uH = new Networking.UploadHandlerRaw(bodyBytes);
    uH.contentType = "application/json";
    request.uploadHandler = uH;
    request.SetRequestHeader("Content-Type", "application/json");
    request.downloadHandler = new Networking.DownloadHandlerBuffer();
    yield request.Send();
    Debug.Log("Normal Capture Response " + request.downloadHandler.text);
}

function SendCaptureApi(tagName) {
    var action = tagToAction[tagName];
    var scenario = actionToPath[action];
    var captures: Boo.Lang.Hash[] = actionToCaptures[action];

    // Get a decision (while posting captures).
    var payloadConfig = {
        // 'identity':'73ESltNk6AEHBVi1nWiApx', // Override by your own if needed.
        'captures': captures
    };
    var payload = this.GetPayload(scenario, payloadConfig);
    // Configure local caller script.
    var method = 'POST';
    var path = 'https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide?account_id=HOLODECK&site_id=holodeck&version=1.10.4';
    // path = "http://httpbin.org/post";
    var body = this.GetJSONOfMap(payload);
    Debug.Log("Decide request " + body);

    // Create and configure the request.
    var request = new Networking.UnityWebRequest(path, Networking.UnityWebRequest.kHttpVerbPOST);
    // Temp body
    var bodyBytes = System.Text.Encoding.UTF8.GetBytes(body);
    var uH = new Networking.UploadHandlerRaw(bodyBytes);
    uH.contentType = "application/json";
    request.uploadHandler = uH;
    request.SetRequestHeader("Content-Type", "application/json");
    request.downloadHandler = new Networking.DownloadHandlerBuffer();
    yield request.Send();
    Debug.Log(request.downloadHandler.text);
    var responseContents = request.downloadHandler.text;
    //  "content_id":"136c6959-cfb7-4dbd-8589-54c135b22547",
    var contentIdKey = "\"content_id\":";
    var contentIdStart = responseContents.IndexOf(contentIdKey);
    if (contentIdStart != -1) {
        var contentIdEnd = responseContents.IndexOf(",", contentIdStart);
        var contentId = responseContents.Substring(contentIdStart + contentIdKey.length + 1, contentIdEnd - contentIdStart - contentIdKey.length - 2);
        Debug.Log("Content Id = " + contentId);
        var decisionAction = tagToDecisionAction[tagName];
        Debug.Log("Action = "+decisionAction);
        if (decisionAction != null) {
            var decisionCaptures: Boo.Lang.Hash[] = actionToCaptures[decisionAction];
            // Get a decision (while posting captures).
            var decisionPayloadConfig = {
                // 'identity':'73ESltNk6AEHBVi1nWiApx', // Override by your own if needed.
                'captures': decisionCaptures
            };
            var decisionPayload = this.GetPayload(scenario, decisionPayloadConfig);
            // Configure local caller script.
            var decisionBody = this.GetJSONOfMap(decisionPayload);
            Debug.Log("Decision Capture " + decisionBody);

            // Create and configure the request.
            var decisionRequest = new Networking.UnityWebRequest(path, Networking.UnityWebRequest.kHttpVerbPOST);
            // Temp body
            var decisionBodyBytes = System.Text.Encoding.UTF8.GetBytes(decisionBody);
            var decisionUH = new Networking.UploadHandlerRaw(decisionBodyBytes);
            decisionUH.contentType = "application/json";
            decisionRequest.uploadHandler = decisionUH;
            decisionRequest.SetRequestHeader("Content-Type", "application/json");
            decisionRequest.downloadHandler = new Networking.DownloadHandlerBuffer();
            yield decisionRequest.Send();
            Debug.Log("Decision Capture Response " + decisionRequest.downloadHandler.text);

        }

    }

}


function GetCapture(captureConfig: Boo.Lang.Hash) {
    var defaultCaptureConfig = {
        'event_name': 'Content View',
        'event_source': 'Web',
        'content_title': 'Holodeck content',
        'url': 'http://holodeck.com',
        // 'referral_url':'',
        'user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3109.0 Safari/537.36',
        //'client_timezone':'240',
        'javascript_version': '1.10.4',
        //'engagement_score':1,
        'content_type': 'page',
        //'page_type':'node page',
        //'post_id':'46',
        //'published_date':'1495650236',
        'author': 'admin',
        'identities': {
            identityName: 'name'
        }
    };
    for (var newEntry in captureConfig) {
        defaultCaptureConfig[newEntry.Key] = newEntry.Value;
    }
    return defaultCaptureConfig;
};

// Get a payload.
function GetPayload(scenario, payloadConfig: Boo.Lang.Hash) {
    var url = 'http://lift3shay2ws7hd7d5ke.devcloud.acquia-sites.com/host/' + scenario;
    var defaultPayloadConfig = {
        'identity_source': 'tracking',
        'identity': trackingIdentifier,
        'touch_identifier': touchIdentifier,
        'url': url,
        'source': 'https://lift3assets.dev.lift.acquia.com/latest/lift.js'
    };
    for (var newEntry in payloadConfig) {
        defaultPayloadConfig[newEntry.Key] = newEntry.Value;
    }
    return defaultPayloadConfig;
};

function GetJSONOfCaptureMap(capture: Boo.Lang.Hash) {
    var jsonPayload = "{";

    for (var entry in capture) {
        if (jsonPayload != "{") {
            jsonPayload += ",";
        }
        if (entry.Key == "identities") {
            jsonPayload += "\"" + entry.Key + "\":";
            var identitiesJson = "{";
            var identitiesObj: Boo.Lang.Hash = entry.Value;
            for (var identityEntry in identitiesObj) {
                if (identitiesJson != "{") {
                    identitiesJson += ",";
                }
                identitiesJson += "\"" + identityEntry.Key + "\":\"" + identityEntry.Value + "\"";;
            }
            identitiesJson += "}";
            jsonPayload += identitiesJson;
        } else {
            jsonPayload += "\"" + entry.Key + "\":\"" + entry.Value + "\"";
        }
    }

    jsonPayload += "}";
    return jsonPayload;

}

function GetJSONOfMap(payload: Boo.Lang.Hash) {
    var jsonPayload = "{";

    for (var entry in payload) {
        if (jsonPayload != "{") {
            jsonPayload += ",";
        }
        var key = entry.Key;
        var value = entry.Value;
        if (key == "captures") {
            jsonPayload += "\"" + key + "\":";
            var capturesJson = "[";
            var captures: Boo.Lang.Hash[] = value;
            for (var captureObj in captures) {
                var capture: Boo.Lang.Hash = captureObj;
                if (capturesJson != "[") {
                    capturesJson += ",";
                }
                capturesJson += this.GetJSONOfCaptureMap(capture);
            }
            capturesJson += "]";
            jsonPayload += capturesJson;
        } else if (key == 'identities') {

        } else {

            jsonPayload += "\"" + key + "\":\"" + value + "\"";
        }
    }

    jsonPayload += "}";
    return jsonPayload;
}

class CaptureSendTracker extends Networking.DownloadHandlerScript implements Vuforia.ITrackableEventHandler {
    var trackableName;
    var sendCaptureScript: SendCaptureScript;

    function CaptureSendTracker(thisFile: SendCaptureScript) {
        this.sendCaptureScript = thisFile;
    }

    function OnTrackableStateChanged(previousStatus: Vuforia.TrackableBehaviour.Status, newStatus: Vuforia.TrackableBehaviour.Status) {
        if (newStatus == Vuforia.TrackableBehaviour.Status.DETECTED ||
            newStatus == Vuforia.TrackableBehaviour.Status.TRACKED ||
            newStatus == Vuforia.TrackableBehaviour.Status.EXTENDED_TRACKED) {
            Debug.Log("Found = " + trackableName);
            sendCaptureScript.StartCoroutine(sendCaptureScript.SendCaptureApi(trackableName));
        } else {
            Debug.Log("Lost = " + trackableName);
        }
    }

    function SendAllCaptureApi(tagName) {
        var identitySource = "tracking";
        var identity = "Holodeck00ALL";
        var indoorsUpdatePersonCapture = sendCaptureScript.GetCapture({
            'event_name': 'updatePerson',
            'event_source': 'Holodeck',
            'person_udf4': '30',
            'person_udf5': 'Male',
            'person_udf6': 'Cambridgeside Galleria Indoors'
        });
        var parkingLotUpdatePersonCapture = sendCaptureScript.GetCapture({
            'event_name': 'updatePerson',
            'event_source': 'Holodeck',
            'person_udf4': '30',
            'person_udf5': 'Male',
            'person_udf6': 'Cambridgeside Galleria Parking Lot'
        });
        var posterTagRecognitionCapture = sendCaptureScript.GetCapture({
            'event_name': 'Tag Recognition',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Indoors',
            'event_udf6': 'POSTER'
        });
        var posterAugmentedRealityActivatedCapture = sendCaptureScript.GetCapture({
            'event_name': 'Augmented Reality Activated',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Indoors',
            'event_udf6': 'POSTER'
        });
        var unicornFrappuccinoBuyCapture = sendCaptureScript.GetCapture({
            'event_name': 'Buy',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Indoors',
            'event_udf6': 'POSTER',
            'event_udf7': 'Unicorn Frappuccino'
        });
        var shirtTagRecognitionCapture = sendCaptureScript.GetCapture({
            'event_name': 'Tag Recognition',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Indoors',
            'event_udf6': 'TSHIRT'
        });
        var shirtAugmentedRealityActivatedCapture = sendCaptureScript.GetCapture({
            'event_name': 'Augmented Reality Activated',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Indoors',
            'event_udf6': 'TSHIRT'
        });
        var shirtCartAbandonCapture = sendCaptureScript.GetCapture({
            'event_name': 'Cart Abandon',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Parking Lot',
            'event_udf6': 'TSHIRT',
            'event_udf7': 'Drupal T Shirt'
        });
        var shirtBuyCapture = sendCaptureScript.GetCapture({
            'event_name': 'Buy',
            'event_source': 'Holodeck',
            'event_udf3': '42.3601',
            'event_udf4': '71.0589',
            'event_udf5': 'Cambridgeside Galleria Parking Lot',
            'event_udf6': 'TSHIRT',
            'event_udf7': 'Drupal T Shirt'
        });
        // Get a decision (while posting captures).
        var readStarbucksPosterAction = sendCaptureScript.GetPayload('starbucks', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [indoorsUpdatePersonCapture, posterTagRecognitionCapture]
        });
        var activatedStarbucksArAction = sendCaptureScript.GetPayload('starbucks', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [posterAugmentedRealityActivatedCapture]
        });
        var buyStarbucksCoffeeAction = sendCaptureScript.GetPayload('starbucks', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [unicornFrappuccinoBuyCapture]
        });
        var readShirtAction = sendCaptureScript.GetPayload('meeting', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [shirtTagRecognitionCapture]
        });
        var activatedShirtArAction = sendCaptureScript.GetPayload('meeting', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [shirtAugmentedRealityActivatedCapture]
        });
        var abandonBuyShirtAction = sendCaptureScript.GetPayload('meeting', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [shirtCartAbandonCapture]
        });
        var parkingLotUpdatePersonCaptureAction = sendCaptureScript.GetPayload('car', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [parkingLotUpdatePersonCapture]
        });
        var buyShirtAction = sendCaptureScript.GetPayload('car', {
            'identity_source': identitySource,
            'identity': identity,
            'captures': [shirtBuyCapture]
        });

        var actionsToSend = [readStarbucksPosterAction, activatedStarbucksArAction, buyStarbucksCoffeeAction,
            readShirtAction, activatedShirtArAction, abandonBuyShirtAction, parkingLotUpdatePersonCaptureAction,
            buyShirtAction
        ];
        for (var actionToSend in actionsToSend) {
            var method = 'POST';
            var path = 'https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide?account_id=HOLODECK&site_id=holodeck&version=1.10.4';
            // path = "http://httpbin.org/post";
            var body = sendCaptureScript.GetJSONOfMap(actionToSend);
            Debug.Log("Decide request " + body);

            // Create and configure the request.
            var request = new Networking.UnityWebRequest(path, Networking.UnityWebRequest.kHttpVerbPOST);
            // Temp body
            var bodyBytes = System.Text.Encoding.UTF8.GetBytes(body);
            var uH = new Networking.UploadHandlerRaw(bodyBytes);
            uH.contentType = "application/json";
            request.uploadHandler = uH;
            request.SetRequestHeader("Content-Type", "application/json");
            request.downloadHandler = new Networking.DownloadHandlerBuffer();
            yield request.Send();
            Debug.Log(request.downloadHandler.text);
            var responseContents = request.downloadHandler.text;
            //  "content_id":"136c6959-cfb7-4dbd-8589-54c135b22547",
            var contentIdKey = "\"content_id\":";
            var contentIdStart = responseContents.IndexOf(contentIdKey);
            if (contentIdStart != -1) {
                var contentIdEnd = responseContents.IndexOf(",", contentIdStart);
                var contentId = responseContents.Substring(contentIdStart + contentIdKey.length + 1, contentIdEnd - contentIdStart - contentIdKey.length - 2);
                Debug.Log("Content Id = " + contentId);
            }


        }
    }
}
