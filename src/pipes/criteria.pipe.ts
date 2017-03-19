import { Pipe, PipeTransform } from '@angular/core';

import Criterion from '../models/criterion.model';

@Pipe({
  name: 'criteriaPipe'
})
export class CriteriaPipe implements PipeTransform {

    public transform(criteria: Criterion[], name: string): Criterion[] {
        if (!criteria) return null;
        if (!name) return criteria;
        return criteria.filter(criterion =>
          criterion.name && criterion.name.toLowerCase().includes(name.toLowerCase()));
    }
}
