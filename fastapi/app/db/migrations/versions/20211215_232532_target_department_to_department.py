"""target_department_to_department

Revision ID: 456cc0a718b1
Revises: 04be7ef14f1a
Create Date: 2021-12-15 23:25:32.581419+09:00

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "456cc0a718b1"
down_revision = "04be7ef14f1a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "subjects",
        sa.Column("department_uuid", postgresql.UUID(as_uuid=True), nullable=True),
    )
    op.drop_constraint(
        "subjects_target_department_uuid_fkey", "subjects", type_="foreignkey"
    )
    op.create_foreign_key(
        None,
        "subjects",
        "departments",
        ["department_uuid"],
        ["uuid"],
        ondelete="CASCADE",
    )
    op.drop_column("subjects", "target_department_uuid")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "subjects",
        sa.Column(
            "target_department_uuid",
            postgresql.UUID(),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.drop_constraint(None, "subjects", type_="foreignkey")
    op.create_foreign_key(
        "subjects_target_department_uuid_fkey",
        "subjects",
        "departments",
        ["target_department_uuid"],
        ["uuid"],
        ondelete="CASCADE",
    )
    op.drop_column("subjects", "department_uuid")
    # ### end Alembic commands ###
