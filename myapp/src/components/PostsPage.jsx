import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostsTable from './PostsTable';
import MultiSelectFilter from './MultiSelectFilter';
import SearchInput from './SearchInput';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ tags: [], searchText: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/posts${location.search}`);
        const data = await response.json();
        setPosts(data.posts);
        setPagination({
          current: data.page,
          pageSize: data.limit,
          total: data.total,
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [location.search, navigate]);

  const availableTags = [...new Set(posts.flatMap(post => post.tags))];

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;

    setPagination(pager);
    navigate(`?page=${pager.current}&limit=${pager.pageSize}`);
  };

  const handleTagsChange = (selectedTags) => {
    setFilters({ ...filters, tags: selectedTags });
    navigate(`?tags=${selectedTags.join(',')}`);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setFilters({ ...filters, searchText });
    navigate(`?search=${searchText}`);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const hasMatchingTag = filters.tags.length === 0 || filters.tags.some(tag => post.tags.includes(tag));
      const textMatch = new RegExp(filters.searchText, 'i').test(post.title) || new RegExp(filters.searchText, 'i').test(post.body);
      return hasMatchingTag && textMatch;
    });
  }, [posts, filters]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <span key={tag} style={{ marginRight: 8 }}>
              {tag}
            </span>
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      <MultiSelectFilter
        options={availableTags}
        value={filters.tags}
        onChange={handleTagsChange}
      />
      <SearchInput value={filters.searchText} onChange={handleSearch} />
      {filteredPosts.length > 0 ? (
        <PostsTable
          dataSource={filteredPosts}
          columns={columns}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <p>No posts found matching your filters.</p>
      )}
    </div>
  );
};

export default PostsPage;
