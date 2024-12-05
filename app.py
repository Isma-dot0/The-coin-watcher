
from flask import Flask, jsonify, request

app = Flask(__name__)


portfolio = []

@app.route('/')
def home():
    return "Welcome to the Crypto Tracker Backend API!"


@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    total_value = sum(item['value'] for item in portfolio)
    return jsonify({"portfolio": portfolio, "total_value": total_value})


@app.route('/portfolio', methods=['POST'])
def add_to_portfolio():
    data = request.json
    print("Received Data:", data)
    name = data.get('name')
    holdings = data.get('holdings')
    value = data.get('value')

    if not name or holdings is None or value is None:
        print("Error: Missing fields")
        return jsonify({"error": "Missing required fields"}), 400


    portfolio.append({
        "name": name,
        "holdings": holdings,
        "value": value
    })
    print("Updated Portfolio:", portfolio)
    return jsonify({"message": f"{name} added to portfolio"}), 201


@app.route('/market', methods=['GET'])
def get_market_data():
    return jsonify({"message": "Market data endpoint placeholder"})

if __name__ == "__main__":
    app.run(debug=True)

