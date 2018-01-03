import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
    	{ props.repos.map(function(repo, index) {
    			return (
    							<div key={index}> 
    								<p>username: {repo.username} <br/> id: {repo.id} <br/> name: <a href={repo.url}>{repo.name}</a>  
    							 	</p>

    							</div>
    						)
    		})
    	}
    </div>
  </div>

)

export default RepoList;