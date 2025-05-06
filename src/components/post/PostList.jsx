import React, { useEffect, useState } from "react";
import postApi from "../../services/postApi.js";
import forumApi from "../../services/forumApi.js";
import { Link } from "react-router-dom";
import Header from "../commun/Header.jsx";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [requirementsList, setRequirementsList] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [Users, setUsers] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const res = await postApi.getAllPosts();
          const postsData = res.data;
          setPosts(postsData);
      
          const usersData = {};
          await Promise.all(
            postsData.map(async (post) => {
              if (!usersData[post.idUser]) {
                const response = await forumApi.getuserById(post.idUser);
                usersData[post.idUser] = response.data.user;
              }
            })
          );
          setUsers(usersData);
          
      
          const allRequirements = postsData.flatMap((post) => post.requirements || []);
          const unique = [...new Set(allRequirements)];
          setRequirementsList(unique);
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      };
      
    
        
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRequirement =
      selectedRequirement === "" ||
      (post.requirements && post.requirements.includes(selectedRequirement));
    return matchesSearch && matchesRequirement;
  });

  return (
    <>
    

      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Find job</h1>
                <div className="pagination-wrapper">
                  <a href="/posts">Jobs</a>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container rts-section-gap">
      <div className="col-lg-9 mx-auto">
      
        <div className="filter-small-top-full" style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "30px" }}>
        <div className="right-filter">
              <span>Showing {filteredPosts.length} results</span>
            </div>
          <div>
            <span>Requirements</span>
            <select
              value={selectedRequirement}
              onChange={(e) => setSelectedRequirement(e.target.value)}
              className="form-select"
              style={{ width: "200px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">All Requirements</option>
              {requirementsList.map((req, idx) => (
                <option key={idx} value={req}>
                  {req}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "250px" }}
            />
          </div>
           <a className="rts-btn btn-primary">
                    <Link to="/addPost">Add post</Link>
                  </a>
        </div>
        </div>
        <div className="row g-4">
          {filteredPosts.map((post) => (
            <div className="col-lg-6" key={post._id}>
              <div className="single-blog-list-wrapper" style={{ height: "100%" }}>
                <div className="information-blog mt-3">
                  <h4>{post.title}</h4>
                  <div>
                  <img
                    src={
                      Users[post.idUser]?.picture
                        ? `http://localhost:3000/uploads/user/${Users[post.idUser].picture}`
                        : Users[post.idUser]?.avatar
                    }
                    alt={Users[post.idUser]?.fullName}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                  />

                  <strong>{post.company}</strong>
                  <p>{Users[post.idUser]?.fullName}</p>
                  </div>
                  <p>{post.description}</p>
                  
                  <Link to={`/posts/${post._id}`} className="rts-btn btn-primary mt-2">
                    Afficher
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default PostList;
