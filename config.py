import os

class Config(object):
        SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
        GOOGLE_APPLICATION_CREDENTIALS =  os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        PROJECT_ID = os.environ.get('PROJECT_ID') or 'foodie-helper-2019'
        CLOUD_STORAGE_BUCKET = os.environ.get('CLOUD_STORAGE_BUCKET') or 'foodie_helper_bucket_1'
        NUTRITIONIX_ID = '76577abe'
        NUTRITIONIX_KEY = '0137c246dd1accd150654034882baf02'
        NUTRITIONIX_URL =  'https://api.nutritionix.com/v1_1/search'