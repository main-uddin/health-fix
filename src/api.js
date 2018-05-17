import wretch from 'wretch'

export default wretch().url(
  process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5000`
)
