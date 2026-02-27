---
title: 🌐 Neo4j Python Explorer: From Zero to Hero
slug: neo4j-from-zero-to-hero
description: Working with Neo4J using Python as a complete beginner.
date: 2026-02-18
authorId: Arvic Gingoyon
tags: [python, graphdb, neo4j]
category: "learn-to-build"
coverImage: nothing.jpeg
---

This guide covers the essentials of managing your self-hosted Neo4j graph database using Python.

---

## 🛠️ 1. Setup and Connection
To begin, you need the official Neo4j driver.
```bash
pip install neo4j
```

The Connection "Interface"
Save this as database.py. It handles the "handshake" between Python and your server.


```python
from neo4j import GraphDatabase

class Neo4jConnection:
    def __init__(self, uri, user, pwd):
        # Use bolt:// for Python (Port 7687)
        self.__driver = GraphDatabase.driver(uri, auth=(user, pwd))

    def close(self):
        self.__driver.close()

    def query(self, query, parameters=None):
        with self.__driver.session() as session:
            result = session.run(query, parameters)
            return [record for record in result]
```

# 🧑‍🤝‍🧑 2. The Friendship Recommender (Repository Pattern)
Instead of writing database code everywhere, we use a Repository. This keeps your code organized by grouping related actions (like adding friends) into one place.

```python
class FriendRepository:
    def __init__(self, connection):
        self.db = connection

    def add_person(self, name):
        """Creates a new person node if they don't exist."""
        query = "MERGE (p:Person {name: $name})"
        self.db.query(query, {"name": name})

    def make_friends(self, name_a, name_b):
        """Creates a FRIEND relationship between two people."""
        query = """
        MATCH (a:Person {name: $name_a})
        MATCH (b:Person {name: $name_b})
        MERGE (a)-[:FRIEND]-(b)
        """
        self.db.query(query, {"name_a": name_a, "name_b": name_b})

    def suggest_friends(self, name):
        """
        Finds 'Friends of Friends' that you aren't already friends with.
        """
        query = """
        MATCH (me:Person {name: $name})-[:FRIEND]-(friend)-[:FRIEND]-(fof:Person)
        WHERE NOT (me)-[:FRIEND]-(fof) AND me <> fof
        RETURN DISTINCT fof.name AS recommendation
        """
        return self.db.query(query, {"name": name})

    def delete_all(self):
        """Clears the whole database."""
        self.db.query("MATCH (n) DETACH DELETE n")
```

# 🚀 3. Running Your Application
Here is how you use your new repository in a real script:

```python
from database import Neo4jConnection
from friend_repo import FriendRepository

# 1. Connect
conn = Neo4jConnection("bolt://66.248.204.201:7687", "neo4j", "your_password")
repo = FriendRepository(conn)

# 2. Reset and Setup
repo.delete_all()
repo.add_person("Alice")
repo.add_person("Bob")
repo.add_person("Charlie")
repo.add_person("David")

# 3. Create a Friendship Chain: Alice -> Bob -> Charlie -> David
repo.make_friends("Alice", "Bob")
repo.make_friends("Bob", "Charlie")
repo.make_friends("Charlie", "David")

# 4. Get a Recommendation for Alice
# Alice knows Bob. Bob knows Charlie. Alice SHOULD know Charlie!
results = repo.suggest_friends("Alice")

print("--- Recommendations for Alice ---")
for rec in results:
    print(f"You might know {rec['recommendation']} through your mutual friends!")

conn.close()
```

# 📊 4. Fundamental Operations (The "Cheat Sheet")

[table]
Operation | Cypher Keyword | Description 
Create | CREATE / MERGE |MERGE is better; it prevents duplicates.
Fetch | MATCH ... RETURN | Finds data based on patterns.
Update | SET | Changes properties (like age or name).
Delete | DELETE | Use DETACH DELETE to remove a node and its connections.
[/table]

# 🐍 5. Try it Yourself!
Use the interactive playground below to test some Python logic. This connects to our secure backend to run your code in real-time.

[python]
# Welcome to the AI PH Python Playground!
# Try calculating some statistics or logic

def recommend_tech(skill):
    if skill.lower() == "python":
        return "You should dive into Neo4j and AI PH!"
    else:
        return "Time to learn Python! 🚀"

print(recommend_tech("python"))

# Try a loop
for i in range(3):
    print(f"Graph Database Step {i+1}")
[/python]

💡Pro Tips for Young Devs
- **The Browser is your Friend:** Keep your Neo4j Browser open while coding. Run MATCH (n) RETURN n to see your Python code working in real-time!

- **Bolt vs HTTP:** Use port 7474 for your web browser, but use port 7687 (Bolt) for your Python code. Bolt is much faster.

- **Safety First:** Never share your password in a public GitHub folder. Use environment variables or a config file instead!