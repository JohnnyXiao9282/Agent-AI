import React, { useState } from "react"; // Import useState
import axios from "axios";
import { Input } from "antd";

const { Search } = Input;

const DOMAIN = "http://localhost:5001";

const searchContainer = {
  display: "flex",
  justifyConten: "center",
};

const ChatComponent = (props) => {
  const { handleResp, isLoading, setIsLoading } = props;
  // Define a state variable to keep track of the search value.
  const [searchValue, setSearchValue] = useState("");

  const onSearch = async (question) => {
    // Clear the search input where the content appears to be taken and used to the user.
    setSearchValue("");
    setIsLoading(true);

    try {
        const response = await axios.get(`${DOMAIN}/chat`, {
        params: {
          question,
        },
      });
      // Send back the question and its answer as the response.
      handleResp(question, response.data);
    } catch(error) {
        console.error(`Error: ${error}`);
        handleResp(question, error);
    } finally {
        // No longer waiting/loading for response.
        setIsLoading(false);
    }
  }


const handleChange = (e) => {
    // Update searchValue state when the user types in the input box.
    setSearchValue(e.target.value);

}

return (
    <div style={searchContainer}>
      <Search
        placeholder="input search text"
        enterButton="Ask"
        size="large"
        onSearch={onSearch}
        loading={isLoading} // When loading is true, the user cannot search; isLoading handles that for us.
        value={searchValue} // Control the value
        onChange={handleChange} // Update the value when changed
      />
    </div>
  );
};

export default ChatComponent;