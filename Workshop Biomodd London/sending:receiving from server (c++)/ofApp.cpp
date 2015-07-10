#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    sensors = new Sensor[3];
    img.load("logo.png");
    
    img.resize(ofGetHeight()/img.getHeight()*img.getWidth(), ofGetHeight());
    
}

//--------------------------------------------------------------
void ofApp::update(){
    // send data
    if ((int)ofGetFrameNum()%100==0) {
        int sensor = (int)ofRandom(100)%3;
        float data = ofRandom(10);
        string url = "http://localhost:3000/sensors/postSensor?d=";
        
        url+=ofToString(data);
        url+="&s=";
        url+=ofToString(sensor);

        ofHttpResponse resp = ofLoadURL(url);
        text = resp.data;
    }
    
    
    
    if ((int)ofGetFrameNum()%151==0) {
        int sensor = (int)ofRandom(100)%3;

        string url = "http://localhost:3000/sensors/getSensors";
        
        ofHttpResponse resp = ofLoadURL(url);
        text = resp.data;
        
        ofxJSONElement json;
        bool parsingSuccessful = json.parse(text);
        
        if (parsingSuccessful){
            for (int i(0); i < 3; i++) {
                sensors[i].rawData.clear();
                sensors[i].averageData.clear();
                
//                cout << ofToFloat(json[i]["raw"][0].asString()) << endl;
                
                for (Json::ArrayIndex rd = 0; rd < json[i]["raw"].size(); rd++) {
                    sensors[i].rawData.push_back(ofToFloat(json[i]["raw"][rd].asString()));
                    sensors[i].averageData.push_back(ofToFloat(json[i]["averageData"][rd].asString()));
                }
            }
        } else {
            ofLogNotice("ofApp::setup")  << "Failed to parse JSON" << endl;
        }
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackgroundGradient(ofColor::cyan, ofColor::purple);
    
    ofPushStyle();
    ofPushMatrix();
    ofSetColor(255,100);
    ofTranslate((ofGetWidth()-img.getWidth())/2, (ofGetHeight()-img.getHeight())/2);
    img.draw(0,0);
    ofPopMatrix();
    ofPopStyle();
    
    ofDrawBitmapStringHighlight(text, 20, 20);
    
    ofPushMatrix();
    ofTranslate(ofGetWidth()/5, 0);
    for (int i(0); i < 3 ; i++) {
        ofTranslate(0, ofGetHeight()/4);
        ofDrawBitmapString("sensor"+ofToString(i), -100, -50);
        ofPoint prevpoint = ofPoint(0, 0);
        for (int x(0); x < sensors[i].averageData.size(); x++) {
            ofPoint pt;
            pt.x = x * 60;
            pt.y = ofMap(sensors[i].averageData[x], 0, 1, -20, 20);
            ofDrawCircle(pt, 10);
            ofLine(pt, prevpoint);
            prevpoint = pt;
        }
    }
    ofPopMatrix();

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){


}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
