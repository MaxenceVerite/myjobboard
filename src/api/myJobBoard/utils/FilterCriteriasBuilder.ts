export enum FilterCriteriaOperator {
  eq = "eq",
  ne = "ne",
  gt = "gt",
  gte = "gte",
  lt = "lt",
  lte = "lte",
}

interface FilterCriteria {
  field: string;
  operator: FilterCriteriaOperator;
  value: string;
}

class FilterCriteriasBuilder {
  private criteria: FilterCriteria[];

  constructor() {
    this.criteria = [];
  }

  addCriteria(
    field: string,
    operator: FilterCriteriaOperator,
    value?: string
  ): FilterCriteriasBuilder {
    if(value == null) return this;

    this.criteria.push({ field, operator, value });

    return this;
  }

  buildQueryString(): string {
    const encodedCriteria = this.criteria.map((criterion) => {
      return {
        field: encodeURIComponent(criterion.field),
        operator: criterion.operator,
        value: encodeURIComponent(criterion.value),
      };
    });

    return encodeURIComponent(JSON.stringify(encodedCriteria));
  }
}


export default FilterCriteriasBuilder;