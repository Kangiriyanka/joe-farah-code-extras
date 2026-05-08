"""Create a category and/or subcategory""" 
@bp.route("/api/drawings/create_category/", methods=["POST"])
def create_category():
    data = request.json
    parent_input = data.get("category", "").lower().strip()
    child_input = data.get("subcategory", "").lower().strip()
    color = data.get("color", "")
    
    # To create a category, you must have one parent.
    if not parent_input:
        return {"error": "Category title is required"}, 400
    
    try:
        # Creating a top-level category
        if not child_input:
            return _create_top_level_category(parent_input, color)
        
        # Creating a subcategory
        return _create_subcategory(parent_input, child_input, color)
        
    except Exception as e:
        db.session.rollback()
        return {"error": f"Database error: {str(e)}"}, 500


def _create_top_level_category(title, color):
    """ 
    Check if the parent category already exists
    Situation: Shapes > Triangles, and I try to create Triangles, it fails
    Triangles cannot be a top-level parent, because it's already a child somewhere
    """
    existing = Category.query.filter_by(title=title).first()
    if existing:
        return {"error": f"This category already exists!"}, 400
    
    category = Category(title=title, color= color)
    
    db.session.add(category)

    try: 
        db.session.commit()
        return jsonify(category.to_json()), 201
    except IntegrityError: 
        db.session.rollback()
        return {"error": f"Category '{title}' already exists"}, 410
  


def _create_subcategory(parent_title, child_title, color):
    parent = Category.query.filter_by(title=parent_title).first()
    if not parent:
        return {"error": f"Parent category '{parent_title}' doesn't exist"}, 400
    
    # Query with the parent.id
    # Subcategories can have the same name, as long as their parents are different
    existing_child = Category.query.filter_by(
        title=child_title, 
        parent_id=parent.id
    ).first()
    
    if existing_child:
            return {"error": f"{child_title} already exists under {parent_title}"}, 400
       
    
    child = Category(title=child_title, parent_id=parent.id, color= color)
    db.session.add(child)
    try: 
        db.session.commit()
        return jsonify(child.to_json()), 201
    except IntegrityError: 
        db.session.rollback()
        return {"error": f"Subcategory is the same as the title"}, 410



