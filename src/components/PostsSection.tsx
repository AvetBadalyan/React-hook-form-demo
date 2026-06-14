import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchPosts, type Post } from '../api/posts';
import { Card, CardTitle, CardSubtitle } from './ui/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.6rem;
`;

const PostCard = styled.article`
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.6rem;
  background: ${({ theme }) => theme.colors.bg};
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-transform: capitalize;
`;

const PostBody = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const UserTag = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.primary}1a;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  margin-bottom: 0.8rem;
  letter-spacing: 0.03em;
`;

const StatusText = styled.p<{ $danger?: boolean }>`
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.danger : theme.colors.muted};
  font-style: italic;
`;

const RefetchButton = styled.button`
  margin-top: 1.6rem;
  padding: 0.8rem 1.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function PostItem({ post }: { post: Post }) {
  return (
    <PostCard>
      <UserTag>user #{post.userId}</UserTag>
      <PostTitle>{post.title}</PostTitle>
      <PostBody>{post.body}</PostBody>
    </PostCard>
  );
}

export function PostsSection() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
  });

  return (
    <Card>
      <CardTitle>Latest Prep Articles</CardTitle>
      <CardSubtitle>
        TanStack Query + Axios — fetches from a REST API, caches the result, and
        refetches automatically on window focus. Click “Refetch” to see the loading state.
      </CardSubtitle>

      {isLoading && <StatusText>Loading posts…</StatusText>}

      {isError && (
        <StatusText $danger>Error: {error?.message ?? 'Unknown error'}</StatusText>
      )}

      {data && (
        <Grid>
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Grid>
      )}

      <RefetchButton onClick={() => { void refetch(); }} disabled={isFetching}>
        {isFetching ? 'Fetching…' : 'Refetch posts'}
      </RefetchButton>
    </Card>
  );
}
