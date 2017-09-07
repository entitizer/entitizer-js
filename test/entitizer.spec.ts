
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

    it('should find entity', function () {
        return entitizer.entitize({ text: 'In Moldova e soare', lang: 'ro' })
            .then(resut => {
                assert.equal(resut.entities.length, 1, 'one entity found');
                assert.equal(resut.concepts.length, 0, '0 unknown concepts');
            });
    });

    it('should find all concepts', function () {
        return entitizer.entitize({ text: 'In Romania e soare. FMI e al 2-lea concept', lang: 'ro' })
            .then(resut => {
                console.log(resut)
                assert.equal(resut.entities.length, 0, 'no entities found');
                // 2-lea is an error
                assert.equal(resut.concepts.length, 3, '3 unknown concepts');
            });
    });
});
