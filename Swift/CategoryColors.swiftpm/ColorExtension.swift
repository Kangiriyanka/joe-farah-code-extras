//
//  File.swift
//  CategoryColors
//
//  Created by Kangiriyanka The Single Leaf on 2026/02/24.
//

import Foundation
import SwiftUI





extension Color {
    
    
    func colorExtractor() -> (red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat){
           // Signature public func resolve(in environment EnvironmentValues) -> Color.Resolved
           if #available(iOS 17.0, *) {
               let resolved = self.resolve(in: EnvironmentValues())
               return (CGFloat(resolved.red), CGFloat(resolved.green), CGFloat(resolved.blue), CGFloat(resolved.opacity))

           } else {
               let uiColor = UIColor(self)
               var r: CGFloat = 0
               var g: CGFloat = 0
               var b: CGFloat = 0
               var a: CGFloat = 0
               
               uiColor.getRed(&r, green: &g, blue: &b, alpha: &a)
               
               return (r, g, b, a)
           }
       
       }

 
  
    /// Transform a SwiftUI Color to an UIColor and extract the components
    /// % start of specification, 0: pad with zeros 2: width, X: uppercase hexcadecimal
   
        func hexExtractor() -> String {
            // Decimals removed for readability
            // r: 0.20, green: 0.78, blue: 0.35, alpha: 1
            // In hex: #34C759FF
            let components = self.colorExtractor()
            
            return String(
                format: "#%02X%02X%02X%02X",
                Int(round(components.red * 255)),
                Int(round(components.green * 255)),
                Int(round(components.blue * 255)),
                Int(round(components.alpha * 255))
            )
        }
    
        

    func sampleRGBAColors() {
            print("Blue:")
            print(Color.blue.colorExtractor())

            print("Green:")
            print(Color.green.colorExtractor())

            print("Pink with 50% opacity:")
            print(Color.pink.opacity(0.5).colorExtractor())

           
    }
    
   
    

    
    
    
    
    /// 1. Trim all non-alphanumeric characters
    /// 2. Scanner decodes the hex digits from the string and stores them in the int variable. &int is a reference to the variable.
    /// 3. Hex strings can have 3, 6 or 8 digits.
 

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0

        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b, a: UInt64

        switch hex.count {
        case 3:
            // not RGBA, but common shorthand (e.g. F00 → FF0000)
            print(int)
            print("Here")
            (r, g, b, a) = (
                ((int >> 8) & 0xF) * 17,
                ((int >> 4) & 0xF) * 17,
                (int & 0xF) * 17,
                255
            )

        case 6:
            // RRGGBB
            (r, g, b, a) = (int >> 16 & 0xFF,
                          int >> 8 & 0xFF,
                          int & 0xFF,
                          255)

        case 8:
            // RRGGBBAA
            (r, g, b, a) = (int >> 24 & 0xFF,
                          int >> 16 & 0xFF,
                          int >> 8 & 0xFF,
                          int & 0xFF)

        default:
            (r, g, b, a) = (0, 0, 0, 255)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    }
    
    
    
  
