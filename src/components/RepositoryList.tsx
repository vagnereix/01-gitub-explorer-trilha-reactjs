import { RepositoryItem } from "./RepositoryItem";
import { useEffect, useState } from "react";

import '../styles/repositories.scss';

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

interface User {
    login: string;
}

export function RepositoryList(){
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        fetch('https://api.github.com/users/vagnereix')
            .then(response => response.json())
            .then(user => setUser(user))

        fetch('https://api.github.com/users/vagnereix/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, []);

    return (
        <section className="repository-list">
            <h1>Lista de repositórios de {user?.login}</h1>

            <ul>
                {repositories.map(repository => {
                    return <RepositoryItem 
                                key={repository.name} 
                                repository={repository} 
                            />
                })}
            </ul>
        </section>
    )
}