import './styles.css';

export const taskSortingTmpl = `
<div class="task-sorting__group--select-option">
  <label class="label--sorter" for="sorting-options">
    Sort by:
    <select class="task-sort" id="sorting-options">
      <optgroup label="Creation moment">
        <option value="creationMoment" data-condition="oldest" selected>Oldest</option>
        <option value="creationMoment" data-condition="newest">Newest</option>
      </optgroup>
      <optgroup label="Priority">
        <option value="priority" data-condition="lowest">Lowest</option>
        <option value="priority" data-condition="highest">Highest</option>
      </optgroup>
      <optgroup label="Due date">
        <option value="dueDate" data-condition="soonest">Soonest</option>
        <option value="dueDate" data-condition="furthest">Furthest</option>
      </optgroup>
      <optgroup label="Alphabetically">
        <option value="alphabetically" data-condition="AtoZ">A-Z</option>
        <option value="alphabetically" data-condition="ZtoA">Z-A</option>
      </optgroup>
    </select>
  </label>
  <label class="label--sorter" for="filter-options">
    Filter by:
    <select class="task-filter" id="filter-options">
      <option value="none" data-condition="none">None</option>
      <optgroup label="Priority">
        <option value="priority" data-condition="1">Low</option>
        <option value="priority" data-condition="2">Medium</option>
        <option value="priority" data-condition="3">High</option>
      </optgroup>
      <optgroup label="Due date">
        <option value="dueDate" data-condition="today">Today</option>
        <option value="dueDate" data-condition="tomorrow">Tomorrow</option>
        <option value="dueDate" data-condition="nextSeven">Next 7 days</option>
        <option value="dueDate" data-condition="thisMonth">This month</option>
        <option value="dueDate" data-condition="nextThirty">Next 30 days</option>
        <option value="dueDate" data-condition="thisYear">This year</option>
        <option value="dueDate" data-condition="someday">Someday</option>
        <option value="dueDate" data-condition="noDueDate">No due date</option>
        <option value="dueDate" data-condition="expired">Expired</option>
      </optgroup>
      <optgroup label="Completion">
        <option value="completion" data-condition="false">Uncompleted</option>
        <option value="completion" data-condition="true">Completed</option>
      </optgroup>
    </select>
  </label>
</div>
<div class="task-sorting__group--search">
  <label class="label--sorter" for="task-search-bar">
    Search task by name:
    <input
      class="task-search-bar"
      type="text"
      placeholder="Do the shopping..."
      spellcheck="false"
    />
  </label>
</div>
<div class="task-sorting__group--delete">
  <button class="delete-task--completed">Delete completed</button>
  <button class="delete-task--expired">Delete Expired</button>
</div>
`;