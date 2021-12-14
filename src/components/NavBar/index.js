import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt, FaGlobe } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import SearchContainer from "../Search";
import UploadPost from "../Modal/UploadPost";
import { useSearch } from "../../hooks/useSearch";
import "./styles.css";

let time = null;

const NavBar = () => {
  const { user, signOut } = useAuth();
  const { searchAction, setUsers, setLoading } = useSearch();
  const [term, setTerm] = useState("");

  useEffect(() => {
    clearTimeout(time);

    if(term.trim()){
      setLoading(true);
      time = setTimeout(() =>{
        searchAction(term);
      },1000)

    }

    return () => {
      setUsers([]);
    }
  },[searchAction, setLoading, setUsers, term])

  const toggleClose = useCallback(() => {
    setTerm("");
  },[]);

  return (
    <div className="Nav">
      <div className="Container">
        <div className="TextLogo">
           <Link to="/">
            <FaGlobe />
            <p className="TextLogo">Connecting People</p>
            </Link>
        </div>
        
        <div className="ContainerSearch">
          <FaSearch color="#ccc" size={15} />
          <input
            placeholder="Buscar"
            value={term}
            onChange={(e) => setTerm(e.target.value)}          
          /> 
          {term.length > 0 && <SearchContainer toggleClose={toggleClose} />}
        </div>

        <div className="ContainerOptions">
          <UploadPost />
          <Link to={`/profile/${user.username}`} style={{marginLeft: '15px'}}>
            <FaUser color="#222" size={25} />
          </Link>

          <FaSignOutAlt color="#222" size={25} onClick={signOut} />
        </div>    
      </div>
    </div>
  );
};

export default NavBar;
