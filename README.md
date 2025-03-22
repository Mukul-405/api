# Autocomplete API Exploration

3 Api for Autocomplete step

http://35.200.185.69:8000/v1/autocomplete?query=<string>

http://35.200.185.69:8000/v2/autocomplete?query=<string>

http://35.200.185.69:8000/v3/autocomplete?query=<string>

# Overview

This project explores an autocomplete API with three versions (/v1, /v2, /v3) to extract all possible names based on given query prefixes. The goal is to automate the extraction process while adhering to the API's constraints and documenting findings.

# Approach

1) Initial Queries:

     Predefined prefixes are used as starting points for each API version.

     Examples: /v1 → ['a', 'ivy', 'homes', 'soft', 'start', 'up'].

2) Automated Extraction:

     Recursive exploration of API responses using the prefixes.
     Results are collected in a Set to ensure uniqueness.

3) Dynamic Rendering:

     Extracted names are displayed using EJS templates (results2.ejs).

# Findings

1. /v1 Endpoint
Names resemble word-like patterns (e.g., aa, aabrkcd, upmwuga).
Prefixes like ivy and up produce shorter names.

2. /v2 Endpoint
Names contain alphanumeric combinations (e.g., am3ous05, mnas5uuh, zo9xd6xi).
Numeric-heavy results observed for prefixes like zo and 09.

3. /v3 Endpoint
Names include special characters and complex patterns (e.g., 0+22l2p8, 9+qab3m, bf-gx5.).
Prefixes like 9, $, and an result in diverse outputs.

# Key Observations

Each endpoint behaves differently:

/v1: Structured word-like names.

/v2: Alphanumeric combinations.

/v3: Complex patterns with special characters.

1. Results depend heavily on input prefixes

2. After getting rate limit exceed or the status code 429 we have to wait for 1 Minute for getting new api request for all the endpoint /v1, /v2 and /v3

3. Upto 100 request we can make using /v1 api endpoint

4. Upto 50 request we can make using /v2 api endpoint

5. Upto 80 request we can make using /v3 api endpoint

6. For /v1 and /v3 api endpoint we can make any number of Api request per 1 second request

7. For /v2 api endpoint we can make any number of Api request per 1.5 second request

# How to Run

git clone https://github.com/Mukul-405/api.git

1. Install dependencies:

    npm install express axios dotenv ejs

2. Start the server:

   node app2.js

3. Access endpoints:

   /v1: http://localhost:4000/v1

   /v2: http://localhost:4000/v2

   /v3: http://localhost:4000/v3

# Conclusion
This project successfully automates the extraction of names from the autocomplete API while documenting differences between versions and handling constraints effectively.