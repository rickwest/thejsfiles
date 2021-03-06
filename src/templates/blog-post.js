import React from 'react'
import { Link, graphql } from 'gatsby'
import readingTime from 'reading-time'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Share from '../components/Share'
import Seo from '../components/Seo';

import { rhythm, scale } from '../utils/typography'
import { formatReadingTime } from '../utils/helpers'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const timeToRead = readingTime(post.html)
    const location = this.props.location

    const shareProps = {
      url: location.href,
      title: post.frontmatter.title,
    };

    return (
      <Layout location={location} title={siteTitle}>
        <Seo frontmatter={post.frontmatter} location={location} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
          {` • ${formatReadingTime(post.timeToRead)}`}
        </p>
        <Bio
          pic={post.frontmatter.pic.childImageSharp.resize.src}
          name={post.frontmatter.title}
          bio={post.frontmatter.bio}
          twitter={post.frontmatter.twitter}
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <div style={{
          marginBottom: rhythm(1),
          textAlign: 'center',
        }}>
          Enjoyed this interview? <strong>Share</strong> the love...
          <Share {...shareProps} />
        </div>
        <hr />
        <Bio />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      timeToRead
      frontmatter {
        title
        bio
        pic {
          childImageSharp {
            resize(width: 100) {
              src
            }
          }
        }
        twitter
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
