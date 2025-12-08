import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import treeContext from '../context/treeContext';
import { familyTreeAPI } from '../services/api';
import { validateFamilyName } from '../utils/validation';
import { handleAPIError } from '../utils/errorHandler';

function Home() {
  const context = useContext(treeContext);
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFamilyName(value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateFamilyName(familyName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await familyTreeAPI.viewFamilyTree(familyName);

      if (response.success && response.data) {
        const familyData = response.data;
        
        // Update context if available
        if (context) {
          context.familyName = familyData.familyName;
          context.familyNodes = familyData.globalNodes;
          context.familyEdges = familyData.globalEdges;
        }

        navigate('/TestViewTree', {
          state: { globalFamilyName: familyData },
        });
      }
    } catch (err) {
      handleAPIError(err, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div className="container my-5">
          <div>
            <a href="/signin">
              <button className="btn btn-secondary float-end me-4">Sign in</button>
            </a>
            <a href="/register">
              <button className="btn btn-secondary float-end me-2">Register</button>
            </a>
          </div>
          <span>
            <h6>Welcome to</h6>
          </span>
          <span className="my-5" style={{ fontFamily: 'fantasy' }}>
            <h1>Know Your Relation</h1>
          </span>
        </div>
      </div>

      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Enter Family Name and View Tree
                      </p>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="exampleInputEmail1"
                              name="familyName"
                              className={`form-control ${error ? 'is-invalid' : ''}`}
                              placeholder="Enter Family Name"
                              value={familyName}
                              onChange={handleInputChange}
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading}
                          >
                            {loading ? 'Loading...' : 'View Tree'}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://wallpaperaccess.com/full/320438.jpg"
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
    </>
  );
}

export default Home;