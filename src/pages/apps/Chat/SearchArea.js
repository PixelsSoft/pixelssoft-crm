
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import Loader from "../../../components/Loader";
import { users } from "./data";
import avatar1 from "../../../assets/images/users/user-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { SearchUser } from "../../../redux/Slices/auth/Auth";
import { CONSTANTS } from "../../../constants/constant";

const SearchArea = ({ onUserSelect }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([...users]);
  const dispatch=useDispatch()
  const [searchText, setSearchText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { token } = useSelector(
    ( state ) => ( {

      token: state.Auth.token,
    
    } )
  );
 
  const search = async(text) => {
    try {
      setSearchText(text);
    
    const response =await dispatch(SearchUser(text,token))


    setUser(
      text
        ? [...response].filter(
            (u) =>
              u?.name?.toLowerCase().indexOf(text.toLowerCase()) >= 0 
          )
        : [...users]
    );
    setIsDropdownVisible(text.length > 0);
    } catch (error) {
      setUser([])
      // console.log("error in search user",error)  
    }
    
  };

  const handleUserClick = (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
    setIsDropdownVisible(false);
  };

  return (
    <Card>
      <Card.Body className="py-2 px-3 border-bottom border-light">
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search People by name and by email"
            value={searchText}
            onChange={(e) => search(e.target.value)}
          />
          <DropdownMenu isVisible={isDropdownVisible}>
            {user.length ? (
              user.map((u) => (
                <DropdownItem key={u.id} onClick={() => handleUserClick(u)}>
                  <Avatar src={u?.profile_img || avatar1} alt={u.name} />
                  <span>{u.name}</span>
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No results found</DropdownItem>
            )}
          </DropdownMenu>
        </SearchContainer>
      </Card.Body>
      <Card.Body>
        {loading && <Loader />}
        <SimpleBar style={{ height: "465px", width: "100%" }} id="chatScrollBar">
          {/* Add chat content here if needed */}
        </SimpleBar>
      </Card.Body>
    </Card>
  );
};

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  font-size: 1rem;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  background-color: #fff;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export default SearchArea;
