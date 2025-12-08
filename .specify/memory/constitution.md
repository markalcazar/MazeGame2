<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - initial constitution establishment)

Modified principles: N/A (initial creation)

Added sections:
- Principle I: Code Quality
- Principle II: Testing Standards
- Principle III: User Experience Consistency
- Principle IV: Performance Requirements
- Section: Quality Gates
- Section: Development Workflow
- Governance rules

Removed sections: N/A (initial creation)

Templates requiring updates:
- .specify/templates/plan-template.md ✅ (no changes needed - Constitution Check section is generic)
- .specify/templates/spec-template.md ✅ (no changes needed - compatible with principles)
- .specify/templates/tasks-template.md ✅ (no changes needed - task structure supports principles)

Follow-up TODOs: None
-->

# MazeGame2 Constitution

## Core Principles

### I. Code Quality

All code MUST adhere to the following non-negotiable standards:

- **Readability First**: Code MUST be self-documenting with clear naming conventions.
  Variable, function, and class names MUST accurately describe their purpose.
- **Single Responsibility**: Each module, class, and function MUST have one well-defined
  responsibility. Functions exceeding 50 lines MUST be reviewed for decomposition.
- **DRY (Don't Repeat Yourself)**: Duplicated logic MUST be extracted into reusable
  components. Three or more instances of similar code MUST be refactored.
- **Consistent Style**: All code MUST follow the project's linting and formatting rules.
  No code may be merged with linting errors or warnings.
- **Meaningful Comments**: Comments MUST explain "why" not "what". Code that requires
  explanation of "what" SHOULD be refactored for clarity instead.

**Rationale**: High code quality reduces technical debt, improves maintainability, and
enables team members to understand and modify code efficiently.

### II. Testing Standards

Testing is MANDATORY for all production code:

- **Test Coverage**: All new features MUST have tests covering happy paths and primary
  error scenarios. Critical paths MUST achieve minimum 80% branch coverage.
- **Test Types**:
  - Unit tests MUST be written for all business logic
  - Integration tests MUST cover component interactions
  - Contract tests MUST validate external interfaces
- **Test Quality**: Tests MUST be deterministic (no flaky tests allowed). Tests MUST
  be independent and runnable in any order.
- **Test Naming**: Test names MUST describe the scenario being tested using the pattern:
  `test_[unit]_[scenario]_[expected_outcome]`
- **Test Maintenance**: Broken tests MUST be fixed immediately. Tests MUST NOT be
  disabled without documented justification and a remediation plan.

**Rationale**: Comprehensive testing ensures reliability, enables confident refactoring,
and catches regressions before they reach users.

### III. User Experience Consistency

All user-facing elements MUST maintain consistency:

- **Visual Consistency**: UI elements MUST follow established design patterns. Colors,
  typography, spacing, and component styles MUST match the design system.
- **Interaction Patterns**: Similar actions MUST behave consistently throughout the
  application. Users MUST NOT encounter unexpected behavior from familiar controls.
- **Feedback**: All user actions MUST provide appropriate feedback (loading states,
  success confirmations, error messages). Response time for feedback MUST be <100ms.
- **Error Handling**: Error messages MUST be user-friendly, actionable, and consistent
  in tone. Technical details SHOULD be logged but NOT displayed to users.
- **Accessibility**: UI MUST meet WCAG 2.1 AA standards. All interactive elements MUST
  be keyboard accessible and screen reader compatible.

**Rationale**: Consistent UX reduces user cognitive load, builds trust, and improves
overall satisfaction and retention.

### IV. Performance Requirements

All features MUST meet these performance standards:

- **Responsiveness**: UI interactions MUST respond within 100ms. Page/screen loads
  MUST complete within 2 seconds under normal conditions.
- **Resource Efficiency**: Memory usage MUST be monitored and optimized. Memory leaks
  are considered critical bugs and MUST be fixed immediately.
- **Frame Rate**: For game/animation elements, the target MUST be 60 FPS minimum.
  Drops below 30 FPS are considered critical bugs.
- **Load Testing**: Features with concurrent user impact MUST be load tested before
  release. Performance regressions MUST block release.
- **Optimization**: Premature optimization is discouraged, but identified bottlenecks
  MUST be addressed. Performance MUST be measured, not assumed.

**Rationale**: Performance directly impacts user experience. Slow or unresponsive
software frustrates users and damages the product's reputation.

## Quality Gates

All code changes MUST pass these gates before merging:

1. **Automated Checks**:
   - All tests pass (unit, integration, contract)
   - Linting passes with zero errors/warnings
   - Build succeeds without errors

2. **Code Review**:
   - At least one approval from a team member
   - All review comments addressed or explicitly deferred with justification

3. **Performance Validation**:
   - No regression in existing benchmarks
   - New features meet performance requirements defined above

4. **Documentation**:
   - Public APIs documented
   - Breaking changes documented in changelog

## Development Workflow

The following workflow MUST be followed for all changes:

1. **Branch Strategy**: Feature branches from main, prefixed with feature type
   (e.g., `feature/`, `fix/`, `refactor/`)

2. **Commit Standards**:
   - Commits MUST be atomic and focused
   - Commit messages MUST follow conventional commits format
   - Each commit MUST leave the codebase in a working state

3. **Pull Request Process**:
   - PRs MUST include description of changes and testing performed
   - PRs MUST be linked to relevant issues/specs
   - Large PRs SHOULD be broken into smaller, reviewable chunks

4. **Continuous Integration**:
   - All CI checks MUST pass before merge
   - Failed CI MUST be addressed before requesting review

## Governance

This constitution supersedes all other development practices. Amendments require:

1. **Proposal**: Document the proposed change with rationale
2. **Review**: Team review period of at least 48 hours
3. **Approval**: Consensus from core team members
4. **Migration**: Plan for existing code to comply (if applicable)

All pull requests and code reviews MUST verify compliance with this constitution.
Violations MUST be addressed before merge unless explicitly justified and documented.

Complexity beyond these standards MUST be justified in writing with clear rationale
explaining why simpler alternatives are insufficient.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
