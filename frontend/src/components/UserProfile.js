import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { familyTreeAPI } from '../services/api';
import { validateFamilyName } from '../utils/validation';
import { handleAPIError } from '../utils/errorHandler';

export default function UserProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newFamilyName, setNewFamilyName] = useState({ familyName: '' });
  const [familylist, setFamilylist] = useState([]);
  const [allFamilyList, setAllFamilyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');

  const email = state?.email || '';
  const password = state?.password || '';

  useEffect(() => {
    const fetchFamilyList = async () => {
      if (!email || !password) {
        setError('Missing credentials. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await familyTreeAPI.getFamilyList(email, password);
        if (response.success && response.data) {
          setFamilylist(response.data.user || []);
          setAllFamilyList(response.data.allFamily || []);
        }
      } catch (err) {
        handleAPIError(err, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyList();
  }, [email, password]);

  const handleModify = (index) => {
    if (index >= 0 && index < familylist.length) {
      const familyObj = familylist[index];
      navigate('/ModifyTree', { state: { familyObj } });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFamilyName((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (nameError) {
      setNameError('');
    }
  };

  const handleNewFamily = () => {
    setNameError('');

    const validationError = validateFamilyName(newFamilyName.familyName);
    if (validationError) {
      setNameError(validationError);
      return;
    }

    const isFound = allFamilyList.some(
      (data) => data.familyName === newFamilyName.familyName
    );

    if (isFound) {
      setNameError(
        'This family name is already taken. Please try with another name like (surname_1 or surname_2)'
      );
      return;
    }

    navigate('/createFamilyTree', {
      state: { newFamilyName, email, password },
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Create New Family
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <div className="d-grid gap-2">
                              <input
                                type="text"
                                name="familyName"
                                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                                id="exampleInputEmail1"
                                onChange={handleInputChange}
                                value={newFamilyName.familyName || ''}
                                placeholder="Enter new family name"
                              />
                              {nameError && (
                                <div className="invalid-feedback">{nameError}</div>
                              )}
                              <button
                                className="btn btn-primary"
                                style={{ margin: '20px' }}
                                type="button"
                                onClick={handleNewFamily}
                              >
                                Add New Family
                              </button>
                            </div>
                          </div>
                        </div>

                        <br />
                        <br />
                        <br />

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Families Created by You
                        </p>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            {familylist.length === 0 ? (
                              <p className="text-center text-muted">
                                No families created yet. Create your first family above!
                              </p>
                            ) : (
                              familylist.map((data, index) => (
                                <div
                                  key={data._id || index}
                                  className="text-uppercase"
                                  style={{ margin: '15px' }}
                                >
                                  <div
                                    className="card ms-auto mb bg-light"
                                    style={{ borderColor: '#34495e' }}
                                  >
                                    <div className="card-body">
                                      {data.familyName}
                                      <button
                                        type="button"
                                        className="btn btn-warning float-end"
                                        onClick={() => handleModify(index)}
                                      >
                                        Modify
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


/*

<div>
                <div className="container my-5" style={{ margin: 'auto'}}>
                    <div className="text-center mb-5" style={{margin: '15px'}}>
                    <h3>Already Created Families</h3>
                </div>

                <div>
                {familylist.map((data, index) => (
                    <div className="text-uppercase" style={{margin: '15px'}}>
                    <div className="card ms-auto mb bg-light" style={{borderColor:'#34495e'}}>
                        <div className="card-body">
                            {data.familyName}
                            <button type="button" className="btn btn-warning float-end" onClick={() => clickOnModify(index)}>Modify</button>
                        </div>
                    </div>
                    </div>
                ))}
                
                <div className="d-grid gap-2">
                <input type="text"  name="familyName" className="form-control" id="exampleInputEmail1" onChange={handleInputs} aria-describedby="Help" placeholder="Enter new family name"/>
                <button className="btn btn-primary" style={{margin: '20px'}} type="button" onClick={clickOnNewFamily}>Add New Family</button>
                </div>

                </div>
                
            </div>


*/