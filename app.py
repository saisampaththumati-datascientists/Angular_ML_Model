from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import json

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        return json.JSONEncoder.default(self, obj)
    
app = Flask(__name__)

# Load the trained model
model = joblib.load('Completed_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    print(data.keys())
    # Assuming input data is a list of features
    df = pd.DataFrame(data,index =[0])
    try:
        prediction = model.predict(df)
    
        return json.dumps( {'prediction':prediction}, cls=NumpyEncoder), 200, {'ContentType':'application/json'}
    except Exception as e:
        return jsonify({'error':"{}".format(e)})



if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# import pandas as pd
# from io import StringIO

# app = Flask(__name__)

# # Load the trained model
# model = joblib.load('model.pkl')

# @app.route('/predict', methods=['POST'])
# def predict():
#     csv_data = request.data.decode('utf-8')
#     data = StringIO(csv_data)
#     df = pd.read_csv(data, header=None)
#     prediction = model.predict(df)
#     return jsonify({'prediction': prediction.tolist()})

# if __name__ == '__main__':
#     app.run(debug=True)