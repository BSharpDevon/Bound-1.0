# Group One Project
Group assignment for Group One

## Project Introduction

### What is the concept? What are you building?

Group One is building **Bound**, a collaborative decision-making app that provides book suggestions based on user input.  
The app’s key **‘bind’** feature allows two users to input their favourite books and receive a recommendation that merges their preferences.

### Competitor Research:

**Fable**  
- Allows users to join or start online book clubs to read, discuss, and engage deeply with book selections.  
- Features clubs hosted by influencers, authors, and celebrities, offering a community-focused reading experience.  
- Users can track progress, set goals, and explore curated lists.  
[Visit Fable](https://fable.co/)

**Goodreads**  
- A large social network for book lovers featuring recommendations, ratings, reviews, and reading lists.  
[Visit Goodreads](https://www.goodreads.com/choiceawards/best-books-2024?ref=gca_signed_out_hp)

**StoryGraph**  
- Known for mood-based recommendations and extensive customisation options.  
[Visit StoryGraph](https://www.thestorygraph.com/)

**Bookly**  
- Helps readers set goals, track progress, and organise reading habits with customisable sessions and detailed statistics.  
- Social features allow users to share reading achievements with friends.  
[Visit Bookly](https://booklyapp.com)

---

### Who will this help? Who is the target audience?

![Goodreads Demographics](goodreadsAudienceStats.png)

**Problem:**  
Finding a book that all book club members or friends will enjoy is challenging when preferences vary by genre, author, and style.

**Solution:**  
- Users create profiles, invite others, and share their favourite books or previous reading lists.  
- The app provides recommendations that satisfy everyone’s preferences.  
- Users can track their progress and set deadlines for reading.

**Demographics of Reading App Users (UK):**  
- 48% (12–15 years), 41% (16–24 years), 40% (25–34 years), 41% (35–44 years) use ebooks frequently.  
- Global survey indicates that 56% of users are women, 42% men, and 1% identify as other.  
- Millennials are more engaged with books than Gen X and Baby Boomers.  

**Market Tailoring:**  
To reach a broader audience, the app integrates with [Bookshop.org](https://uk.bookshop.org/) to offer paper book purchases. Bookshop.org supports local bookshops and offers a 10% affiliate programme for book recommendations.

---

### How will you be working? What tools will help?

**Frontend:**  
- **Figma**: Wireframes for UX/UI design.  
- **React (Vite/Native) & JavaScript**: For interactive pages.  
- Components to fetch and display book images, ratings, and details.

**Backend:**  
- **Node.js**: Server-side APIs. May include Google Books API, NYT Books API, and Amazon API.  
- **Database:** SQL or other tools to store book data.

**Security:**  
- User authorisation features.

**Communication:**  
- Slack  
- Gather  
- GitHub  
- Visual Studio Code

---

### How are we going to organise the workload? Who does what and when?

We will use a range of methods to divide tasks within our workload:  
- Regular check-ins to ensure we are on track to reach our goal.  
- Updating our Activity Log to track our progress and tasks.  
- Prioritising tasks using the MoSCoW method (Must Have, Should Have, Could Have, Will Not Have).  
- Pair programming.  
- Creating a to-do list and splitting responsibilities.  
- Agile methods for iterative development.

---

### What are the main features of your project?

**User Profiles**  
- **User Login/Signup:** Secure login/signup functionality with email.  
- **Profile Setup:** Users create a profile including their name, avatar, and reading preferences.  
- **Personal Library:** Users can add books they have read, are currently reading, or wish to read.  
- **Invite Friends:** Ability to invite friends or book club members to join the app for collaborative book discovery.  
- **Book Club Page:** Space to create a book club, provide a name, and invite users showing the current book and start/end date for reading.

**Book Discovery & Recommendations**  
- **Public API Integration:** Use APIs such as:  
  - **Google Books API:** Provides book images, descriptions, author information, and ratings.  
  - **New York Times Books API:** Fetches data about current NYT bestsellers. (Do we want to include other awards, e.g., Women’s Prize for Fiction?)  
  - **Amazon Product Advertising API:** Provides links to purchase books directly on Amazon (affiliate marketing opportunity £££).  
- **Book Images & Ratings:** Display book covers, average ratings, and detailed reviews.  
- **Book Details:** Include author information, publication year, and short summaries.  
- **Bestseller Status:** Highlight if a book is a current or past NYT bestseller.  

**Book Quiz**  
- Helps users decide what book to read next by taking a quiz based on their preferences, including genres, interests, topics, fiction/non-fiction, mood, and desired book length.

**Voting**  
- Allow users to vote on suggested books to help the group make a decision.

**User Input**  
- **Input Past Reads:** Users can manually enter or import data about books they have read, liked, or disliked. (Importing may be difficult due to Goodreads closing their public API.)  
- **Top Picks:** Users can list their top current books, and the app will find overlaps or suggest similar books.  

**Recommendation Algorithm**  
- **Mutual Book Suggestions:** Using algorithms, the app will suggest books that match shared genres or topics based on combined user preferences.

---

## Our Design Board

### Summary of Design Choices

- **Accessibility:** Light text on a dark background to enhance readability and contrast. The colours are reminiscent of a dark academia theme.  
- **Flexibility:** Ability to zoom in or change font sizes to accommodate all users. Images will include descriptions for accessibility.  
- **Readability:** The design will follow a Z-pattern to maximise readability.  
- **Responsiveness:** The website will be fully responsive, adapting seamlessly to any device.  
