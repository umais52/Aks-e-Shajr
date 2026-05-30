import json
with open('C:/Users/TECHNOSELLERS/.gemini/antigravity/brain/6d9bb6b5-a407-4a08-a650-499094ee6a24/.system_generated/steps/114/output.txt', 'r') as f:
    try:
        data = json.loads(f.read().split('\n')[-1])
        def get_texts(node):
            texts = []
            if 'characters' in node:
                texts.append(node['characters'])
            if 'children' in node:
                for c in node['children']:
                    texts.extend(get_texts(c))
            return texts
        
        for k, v in data['nodes'].items():
            print("Fields in node:")
            for t in get_texts(v['document']):
                print("-", t)
    except Exception as e:
        print("Error:", e)
