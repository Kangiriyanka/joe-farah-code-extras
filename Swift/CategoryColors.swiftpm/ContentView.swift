import SwiftUI
import Foundation


struct Category: Identifiable, Codable {

    let id = UUID()
    var name: String
    var categoryColor: CategoryColor
    
    
    enum CodingKeys: String, CodingKey {
        case id
        case name
        case categoryColor
        
    }
    
}

struct CategoryColor: Codable {
    
    // These can be optionally be removed, but I'll leave them for
    // comparison purposes.
    var red: CGFloat
    var green: CGFloat
    var blue: CGFloat
    var alpha: CGFloat
    // New property
    var hex: String
    
    var getColor : Color {
        Color(red: red, green: green, blue: blue, opacity: alpha)
    }
    
    
    var getColorFromHex: Color {
        Color(hex: self.hex)
    }
    
    
    
}

struct CategoryCreatorView: View {

    @State private var categoryColor: Color = .green
    @State private var categoryName: String = ""
    @State private var categories: [Category] = []

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                TextField("Category name", text: $categoryName)
                    .textFieldStyle(.roundedBorder)
                
                ColorPicker("Pick a color", selection: $categoryColor)
                
                categoryCreatorButton
                jsonStringCreatorButton
                jsonStringDecoderButton
            }
            .padding()
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(radius: 2)
            .padding()

            Spacer()

            categoryGrid

            Spacer()
            .navigationTitle(Text("Category Creator"))
        }
       
    }

    var categoryCreatorButton: some View {
        Button("Create category") {
            // Add this
            let c = categoryColor.colorExtractor()
            let hex = categoryColor.hexExtractor()
            let newCategoryColor = CategoryColor(red: c.red, green: c.green, blue: c.blue, alpha: c.alpha, hex: hex)
            let newCategory = Category(name: categoryName, categoryColor: newCategoryColor)
            categories.append(newCategory)

            categoryName = ""
            categoryColor = .green
            
           
        }
    }
    
    var jsonStringCreatorButton: some View {
        
        Button("Create JSON") {
            do {
                let jsonString = try convertToJSONString()
                print(jsonString)
            } catch {
                print("Failed to create JSON:", error)
            }
        }
        
    }
    
    var jsonStringDecoderButton: some View {
        Button("Decode JSON") {
            do {
                categories = try loadCategoriesFromJSON()
                print("Loaded categories")
            } catch {
                print("Failed to load:", error)
            }
        }
    }
    
   

    var categoryGrid: some View {
        LazyVGrid(
            columns: Array(repeating: GridItem(.flexible()), count: 2),
            spacing: 12
        ) {
            ForEach(categories) { category in
                HStack {
                    Text(category.name)
                  
                    
                }
                .padding()
                .frame(maxWidth: .infinity)
                // Change this as you please
                .background(category.categoryColor.getColorFromHex)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(
                    Text(category.categoryColor.hex)
                        .font(.caption2)
                        .padding(6)
                        .background(.white.opacity(0.2))
                        .clipShape(RoundedRectangle(cornerRadius: 6)),
                    alignment: .bottomTrailing
                )
            }
        }
        .padding()
    }
    
    func convertToJSONString() throws -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted]
        
        let data = try encoder.encode(categories)
        return String(data: data, encoding: .utf8) ?? ""
    }
    
    func decodeFromJSONString(_ json: String) throws -> [Category] {
        let decoder = JSONDecoder()
        let data = Data(json.utf8)
        return try decoder.decode([Category].self, from: data)
    }
    
    func loadCategoriesFromJSON() throws -> [Category] {
        let json = """
        [
          {
            "id": "00000000-0000-0000-0000-000000000001",
            "name": "Red",
            "categoryColor": { "red": 1.0, "green": 0.0, "blue": 0.0, "alpha": 1.0, "hex": "#F00" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000002",
            "name": "Green",
            "categoryColor": { "red": 0.0, "green": 1.0, "blue": 0.0, "alpha": 1.0, "hex": "#0F0" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000003",
            "name": "Blue Short",
            "categoryColor": { "red": 0.0, "green": 0.533, "blue": 1.0, "alpha": 1.0, "hex": "#08F" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000004",
            "name": "Orange",
            "categoryColor": { "red": 1.0, "green": 0.341, "blue": 0.2, "alpha": 1.0, "hex": "#FF5733" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000005",
            "name": "Purple",
            "categoryColor": { "red": 0.416, "green": 0.051, "blue": 0.678, "alpha": 1.0, "hex": "#6A0DAD" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000006",
            "name": "Navy",
            "categoryColor": { "red": 0.102, "green": 0.102, "blue": 0.18, "alpha": 1.0, "hex": "#1A1A2E" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000007",
            "name": "Orange Transparent",
            "categoryColor": { "red": 1.0, "green": 0.341, "blue": 0.2, "alpha": 0.502, "hex": "#FF573380" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000008",
            "name": "Purple Full",
            "categoryColor": { "red": 0.416, "green": 0.051, "blue": 0.678, "alpha": 1.0, "hex": "#6A0DADFF" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000009",
            "name": "Navy Faded",
            "categoryColor": { "red": 0.102, "green": 0.102, "blue": 0.18, "alpha": 0.8, "hex": "#1A1A2ECC" }
          },
          {
            "id": "00000000-0000-0000-0000-000000000010",
            "name": "Random",
            "categoryColor": { "red": 0.667, "green": 0.733, "blue": 0.8, "alpha": 1.0, "hex": "#ABC" }
          }
        ]
        """
        return try JSONDecoder().decode([Category].self, from: Data(json.utf8))
    }
    
  
}

#Preview {
    CategoryCreatorView()
}

