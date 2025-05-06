
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {useParams} from "react-router-dom";



function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}


function Room() {
    const {roomID} = useParams();
   let myMeeting = (element) => {
       const appID =742750760 ;
       const serverSecret = "eb9fc9e7f318ff01f1a4ed2fd3d3b266";
       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
       // Create instance object from Kit Token.
       const zp = ZegoUIKitPrebuilt.create(kitToken);
       // start the call
       zp.joinRoom({
           container: element,
           sharedLinks: [
               {
                   name: 'Personal link',
                   url:
                       window.location.protocol + '//' +
                       window.location.host + window.location.pathname +
                       '?roomID=' +
                       roomID,
               },
           ],
           scenario: {
               mode: ZegoUIKitPrebuilt.VideoConference,
           },
       });
   }

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{width: '100vw', height: '100vh'}}
        ></div>
    );
}

export default Room;