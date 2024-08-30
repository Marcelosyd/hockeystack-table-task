## Hockeystack table task

### Getting Started

Clone repository:

```
git clone git@github.com:Marcelosyd/hockeystack-table-task.git
# or
git clone https://github.com/Marcelosyd/hockeystack-table-task.git
```

Install dependencies and run dev environment

```
pnpm install

pnpm dev
```

Access [http://localhost:3000](http://localhost:3000).

### Future improvements / Next steps

- Move pagination, sorting and elements per page logic to the backend API to improve performance and reduce time to load. Cache data with useQuery to avoid unnecessary fetching of same data every time.
- For narrow screens, instead of using a table with horizontal scrolling, change it to a grid of cards with input to select sorting by and a button for defining the direction.
- Configure a theme token file to hold styling properties and configure light mode.

### Trade offs

- To meet the deadline I kept the pagination logic on the front-end, didn't enable elements per page option and for small screen reponsive design went with horizontal scroll approach.
