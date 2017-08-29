
import { Entitizer } from '../src';
import { EntityCreate, UniqueNameCreate } from 'entitizer.entities';
import { DataEntityRepository, MemoryEntityStore, DataUniqueNameRepository, MemoryUniqueNameStore, EntityDataMapper, UniqueNameDataMapper } from 'entitizer.data';
import * as assert from 'assert';


describe('Entitizer', function () {
    const entityRepository = new DataEntityRepository(new MemoryEntityStore(), new EntityDataMapper());
    const uniqueNameRepository = new DataUniqueNameRepository(new MemoryUniqueNameStore(), new UniqueNameDataMapper());
    const entitizer = new Entitizer(entityRepository, uniqueNameRepository);
    const createEntity = new EntityCreate(entityRepository);
    const createUniqueName = new UniqueNameCreate(uniqueNameRepository);

    before(function () {
        return Promise.all([
            createEntity.execute({ lang: 'ro', wikiId: 'Q217', name: 'Moldova', abbr: 'RM', type: 'L' }).toPromise(),
            createUniqueName.execute({ lang: 'ro', entityId: 'ROQ217', name: 'Moldova' }).toPromise()
        ])
    });

    it('should entitize an empty context', function () {
        return entitizer.entitize({ text: 'In Moldova e soare', lang: 'ro' })
            .then(resut => {
                console.log(resut);
            });
    });
});
