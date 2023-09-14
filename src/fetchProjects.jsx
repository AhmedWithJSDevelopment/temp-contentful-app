import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
// import { projects } from './data';

const client = createClient({
  space: 'ksez9gltz1ra',
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
  // accessToken: 'kNhLiHZs9BOwDynnZtF75hN-BLJJzXjqzZJorZ1bZoI',
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        console.log(response);
        return { title, url, id, img };
      });
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
