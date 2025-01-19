# Google Maps Offline SMS

A Node.js-based service that allows users to request Google Maps directions via SMS using Twilio.

# Tech Stack

Node.js
Axios (HTTP requests)
Twilio SMS (messaging service)
Twilio Serverless Functions (backend logic)
Google Cloud Platform (GCP)
Google Maps Directions API

# Features

Receive 2-way directions via SMS through a Twilio phone number.
Serverless architecture using Twilio Functions.
Secure API requests with an Axios-based service.
Supports webhook retries on primary failure.

# Configuration

Twilio: Phone number, messaging configuration, and Twilio Serverless environment setup.
Google Maps Platform: API key with access to the Directions API.

# Setup
1. Clone repo
2. Setup accounts (if you don't already have) on Twilio, GCP Platform.
3. Import twilio function into the SMS service.
4. Enter all keys and deploy.
