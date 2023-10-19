"use client";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { useAuth } from "../auth/login";
import axios from "axios";

const Page = () => {
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);
  const [userName, setUserName] = useState("");


  const auth = useAuth();

  const signIn = async (username, tokenid) => {
    const regex = /\.mmit$/;
    if (!regex.test(domain) || !domain || !tokenId) {
      setInputError("Please fill all the fields");
      return;
    }
    setLoading(true);
    let response;
    try {
      response = await axios.get(`/api/sdk`, {
        params: {
          username: username,
          id: tokenid
        }
      });
    } catch (error) {
      console.error(error);
    }
    const uservalidator = response?.data?.data
    if (uservalidator.success == true) {
      setLoginBtnVisible(false);
      const user = domain.slice(0, -5);
      setUserName("welcome " + user)
      handleClose()
      setLoading(false);
    }
    else {
      swal("Error", `${uservalidator.message}`, "error");
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    auth.login({ domain, tokenId });
    signIn(domain, tokenId)
  };


  const logOutUser = () => {
    setLoginBtnVisible(true);
  };

  const handleClose = () => {
    setShow(false);
    setDomain("");
    setTokenId("");
  };

  const handleShow = () => setShow(true);

  return (
    <div className="bg-img">
      <div className="flex flex-col md:flex-row items-center justify-between nav-bg w-full p-4 md:p-0">
        <div className="flex flex-wrap justify-between items-center mb-4 md:mb-0">
          <div className="mx-auto sm:mx-0 w-[150px] sm:w-[200px]">
            <Image src={logo} />
          </div>

        </div>
        <h2 className="text-center text-2xl text-white">{userName}</h2>

        <div className="flex flex-col md:flex-row items-center">
          {loginBtnVisible ? (
            <button
              className="inline-flex text-white py-1 px-4 border mr-4 hover:opacity-[0.80] mb-2 md:mb-0"
              onClick={handleShow}
            >
              Login With MMIT Domain
            </button>
          ) : (
            <>
              <button
                className="inline-flex text-white py-1 px-4 border mr-4 hover:opacity-[0.80] mb-2 md:mb-0"
                onClick={logOutUser}
              >
                Logout
              </button>
            </>
          )}

          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-white">Insert Your MMIT Domain</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Domain"
                      onChange={(e) => {
                        setDomain(e.target.value);
                        setInputError("");
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="number"
                      placeholder="Token Id"
                      onChange={(e) => {
                        setTokenId(e.target.value);
                        setInputError("");
                      }}
                    />
                  </Form.Group>

                  <p className="text-danger my-2">{inputError}</p>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="dark" onClick={onSubmit}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-5xl mt-10 md:mt-80 px-4 md:px-32 text-center font-thin leading-[1.50]">
          Skyline Web represents a captivating, story-led, Web3 journey.
        </h1>
      </div>
    </div>

  );
};

export default Page;
