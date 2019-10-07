//
//  ViewController.swift
//  rnWebViewTest
//
//  Created by c4605 on 2019/10/3.
//  Copyright © 2019 c4605. All rights reserved.
//

import UIKit
import React

class ViewController: UIViewController, RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
         return URL(string: "http://127.0.0.1:8081/src/index.bundle?platform=ios&dev=true")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let mockData:NSDictionary = [:]
        
        let jsBridge = RCTBridge(delegate: self, launchOptions: nil)
        let rootView = RCTRootView(
            bridge: jsBridge!,
            moduleName: "AppRoot",
            initialProperties: mockData as [NSObject : AnyObject]
        )
        self.view = rootView
    }
}

