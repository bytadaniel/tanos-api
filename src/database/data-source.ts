import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
