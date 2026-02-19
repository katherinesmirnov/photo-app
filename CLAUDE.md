### Component Reuse
**Always check for existing components before creating new ones
1. Check `server/app/components` for reusable base components
2. Only create a new component if no existing component can be adapted or extended

### Code Style
- Do not write in-line comments, unless for lines that have very complex reasoning.
- Use Typescript with full type safety
- Follow existing patterns in the code base

### Documents
Update these documents if required by high level changes.
- Archiectural diagram: `server/ARCHITECTURE.md`

### Package Installatiobn
**DO NOT install packages** when reading doucmentation. Only install if:
1. User explicitly requests it
2. Adding new functionality requiring new dependencies
3. Starting a new prohect from scratch


### Reference Documentation
- **Next.js** https://nextjs.org/docs. Reference version 16.1.6, using the app router.
- **Database** https://www.prisma.io/docs/orm. Reference the SQLite and/or next.js documentation.