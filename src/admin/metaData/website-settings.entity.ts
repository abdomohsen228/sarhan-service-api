import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('website_settings')
export class WebsiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  slogan: string;

  @Column('text', { array: true, nullable: true })
  phoneNumbers: string[];

  @Column('text', { array: true, nullable: true })
  emails: string[];

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  instagramUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  whatsAppLink: string;

  @Column({ nullable: true })
  youtubeUrl: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updatedAt: Date;
}
