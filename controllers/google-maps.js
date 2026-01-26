const axios = require('axios');

module.exports = {
  getLatLong: async (req, res) => {
    try {
      const address = req.query.address || (req.body && req.body.address);
      const mapKey = req.query.mapKey || (req.body && req.body.mapKey);
      if (!address) return res.status(400).json({ error: 'Missing address parameter (query or JSON body)' });

      const apiKey = mapKey || process.env.GOOGLE_MAPS_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'Google Maps API key not configured in GOOGLE_MAPS_API_KEY' });

      const url = 'https://maps.googleapis.com/maps/api/geocode/json';
      const response = await axios.get(url, { params: { address, key: apiKey } });

      return res.status(response.status).json(response.data);
    } catch (err) {
      const status = err.response ? err.response.status : 500;
      const data = err.response ? err.response.data : { error: err.message };
      return res.status(status).json(data);
    }
  }
};
