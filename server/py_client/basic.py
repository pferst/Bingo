import requests

# endpoint = "http://httpbin.org/status/200"
endpoint = "http://localhost:8000/api/"

get_response = requests.get(endpoint, params={"abc": 123}, json={"query": "Hello world"}) # HTTP request
print(get_response.json())
# print(get_response.status_code)

