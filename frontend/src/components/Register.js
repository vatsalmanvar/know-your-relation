import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { isValidEmail, validatePassword } from '../utils/validation';
import { handleAPIError } from '../utils/errorHandler';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cpassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!formData.cpassword) {
      newErrors.cpassword = 'Please confirm your password';
    } else if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Password doesn't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { email, password, cpassword } = formData;
      const response = await authAPI.register(email, password, cpassword);

      if (response.success) {
        // Store token if provided
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        navigate('/signin');
      }
    } catch (error) {
      handleAPIError(error, setSubmitError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                    {submitError && (
                      <div className="alert alert-danger" role="alert">
                        {submitError}
                      </div>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            name="email"
                            value={formData.email}
                            onChange={handleInputs}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            disabled={loading}
                          />
                          <label className="form-label" htmlFor="form3Example3c">
                            Your Email
                          </label>
                          {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            name="password"
                            value={formData.password}
                            onChange={handleInputs}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            disabled={loading}
                          />
                          <label className="form-label" htmlFor="form3Example4c">
                            Password
                          </label>
                          {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={handleInputs}
                            className={`form-control ${errors.cpassword ? 'is-invalid' : ''}`}
                            disabled={loading}
                          />
                          <label className="form-label" htmlFor="form3Example4cd">
                            Repeat your password
                          </label>
                          {errors.cpassword && (
                            <div className="invalid-feedback">{errors.cpassword}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="demo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register