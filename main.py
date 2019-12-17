# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from config import Config
from flask import Flask, render_template, flash, request
from clarifai.rest import ClarifaiApp
from flask_materialize import Material
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo, Length
import logging
import os
from google.cloud import storage
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
app.config.from_object(Config)
Material(app)  
clarifai = ClarifaiApp(api_key='46b5b39ef59b479b98c0c4b745c479e8')

#Function for Clarifai
class UrlForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    submit = SubmitField('Sign In')

def runImage (imageUrl):
    model = clarifai.public_models.food_model
    response = model.predict_by_url(url=imageUrl)
    return response

def getConcept(result_json):
    """ Returns first five concepts given a json"""
    answers = {}
    answers[0] = result_json['outputs'][0]["data"]['concepts'][0]['name']
    answers[1] = result_json['outputs'][0]["data"]['concepts'][1]['name']
    answers[2] = result_json['outputs'][0]["data"]['concepts'][2]['name']
    answers[3] = result_json['outputs'][0]["data"]['concepts'][3]['name']
    answers[4] = result_json['outputs'][0]["data"]['concepts'][4]['name']
    return answers

#Functions for Nutritionix
def getNutrition(searchTerm):
    payload = {'addId': app.config['NUTRITIONIX_ID'], 'appKey':app.config['NUTRITIONIX_KEY'], 'query':searchTerm}
    r = requests.post(app.config['NUTRITIONIX_URL'], json=payload)
    return r.text

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    #form = UrlForm()
    # if form.validate_on_submit():
    #     """flash('Image analysis requested')"""
    #     result = runImage(form.url.data)
    #     # result = getConcept(result, 0)
    #     return render_template('index.html', message=result)
    # return render_template('index.html', form=form)
    return render_template('index copy.html')

@app.route('/upload', methods=['POST'])
def upload():
    """Process the uploaded file and upload it to Google Cloud Storage."""
    uploaded_file = request.files.get('file')

    if not uploaded_file:
        return 'No file uploaded.', 400

    # Create a Cloud Storage client.
    gcs = storage.Client()

    # Get the bucket that the file will be uploaded to.
    bucket = gcs.get_bucket('foodie_helper_bucket_1')
    #app.config['CLOUD_STORAGE_BUCKET']
    # Create a new blob and upload the file's content.
    blob = bucket.blob(uploaded_file.filename)

    blob.upload_from_string(
        uploaded_file.read(),
        content_type=uploaded_file.content_type
    )

    # The public URL can be used to directly access the uploaded file via HTTP.
    result = runImage(blob.public_url)
    machineResult = getConcept(result)
    return render_template('results.html', url=blob.public_url, machineResult=machineResult)
    #return render_template('results.html', url="https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking.jpg", machineResult="Pizza")

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
